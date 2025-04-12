
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { 
  getLearningTrackById, 
  getModulesByTrackId,
  getUserProgress,
  createOrUpdateUserProgress
} from '@/services/learningService';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Check, Clock, LockIcon } from 'lucide-react';

const TrackDetailPage: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);
  
  if (!trackId) {
    return <div>Track ID is required</div>;
  }
  
  // Fetch track details
  const { 
    data: track, 
    isLoading: isLoadingTrack 
  } = useQuery({
    queryKey: ['learningTrack', trackId],
    queryFn: () => getLearningTrackById(trackId)
  });
  
  // Fetch track modules
  const { 
    data: modules, 
    isLoading: isLoadingModules 
  } = useQuery({
    queryKey: ['trackModules', trackId],
    queryFn: () => getModulesByTrackId(trackId)
  });
  
  // Fetch user progress
  const { 
    data: progress,
    isLoading: isLoadingProgress,
    refetch: refetchProgress 
  } = useQuery({
    queryKey: ['userProgress', user?.id, trackId],
    queryFn: () => user ? getUserProgress(user.id, trackId) : null,
    enabled: !!user
  });
  
  const isEnrolled = !!progress;
  const currentModuleId = progress?.current_module_id;
  
  // Handle enrollment
  const handleEnroll = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    try {
      setEnrolling(true);
      
      // Get first module
      const firstModule = modules && modules.length > 0 ? modules[0] : null;
      
      if (firstModule) {
        await createOrUpdateUserProgress(user.id, trackId, {
          current_module_id: firstModule.id,
          progress_percentage: 0,
          completed_challenges: []
        });
        
        // Refetch progress
        await refetchProgress();
      }
    } catch (error) {
      console.error('Error enrolling in track:', error);
    } finally {
      setEnrolling(false);
    }
  };
  
  // Handle continue learning
  const handleContinue = () => {
    if (currentModuleId) {
      navigate(`/learning/${trackId}/module/${currentModuleId}`);
    }
  };
  
  const isLoading = isLoadingTrack || isLoadingModules || isLoadingProgress;
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-full max-w-2xl" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-64 w-full mb-8" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!track) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">Learning Track Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The learning track you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/learning">Back to Learning Tracks</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/learning">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h2 className="text-2xl font-bold ml-2">Track Details</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{track.title}</h1>
              <p className="text-muted-foreground mb-6">{track.description}</p>
              
              {isEnrolled && progress && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Your progress</span>
                    <span>{progress.progress_percentage}%</span>
                  </div>
                  <Progress value={progress.progress_percentage} className="h-2" />
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Modules</h3>
              {modules && modules.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {modules.map((module, index) => {
                    const isCompleted = progress?.completed_challenges?.length 
                      ? index < modules.findIndex(m => m.id === currentModuleId)
                      : false;
                    const isCurrent = module.id === currentModuleId;
                    const isLocked = !isEnrolled || (index > modules.findIndex(m => m.id === currentModuleId));
                    
                    return (
                      <AccordionItem value={module.id} key={module.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center">
                            {isCompleted && <Check className="h-5 w-5 text-green-500 mr-2" />}
                            {isCurrent && !isCompleted && <div className="h-2 w-2 rounded-full bg-blue-500 mr-3" />}
                            {isLocked && <LockIcon className="h-4 w-4 text-muted-foreground mr-2" />}
                            <span>
                              Module {index + 1}: {module.title}
                              {isCurrent && <span className="ml-2 text-blue-500 text-sm font-normal">(Current)</span>}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-8 pr-4 pb-2">
                            <p className="text-muted-foreground mb-4">{module.description}</p>
                            
                            {!isLocked && (
                              <Button 
                                size="sm"
                                onClick={() => navigate(`/learning/${trackId}/module/${module.id}`)}
                              >
                                {isCompleted ? 'Review Module' : 'Start Module'}
                              </Button>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              ) : (
                <p className="text-muted-foreground">No modules available for this track yet.</p>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Track Information</CardTitle>
                <CardDescription>Details about this learning track</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Difficulty Level</div>
                  <div className="text-muted-foreground">{
                    track.level === 1 ? 'Beginner' :
                    track.level === 2 ? 'Intermediate' : 'Advanced'
                  }</div>
                </div>
                
                {track.estimated_hours && (
                  <div>
                    <div className="text-sm font-medium">Estimated Time</div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{track.estimated_hours} hours</span>
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="text-sm font-medium">Modules</div>
                  <div className="text-muted-foreground">{modules?.length || 0} modules</div>
                </div>
                
                <div className="pt-4">
                  {!isEnrolled ? (
                    <Button
                      className="w-full"
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? 'Enrolling...' : 'Enroll Now'}
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={handleContinue}
                    >
                      Continue Learning
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrackDetailPage;
