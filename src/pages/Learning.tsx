
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { getLearningTracks, getUserProgress, LearningTrack, UserProgress } from '@/services/learningService';
import TrackCard from '@/components/learning/TrackCard';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

const LearningPage: React.FC = () => {
  const { user } = useAuth();
  const [userProgressMap, setUserProgressMap] = useState<Record<string, number>>({});
  
  // Fetch all learning tracks
  const { data: tracks, isLoading } = useQuery({
    queryKey: ['learningTracks'],
    queryFn: getLearningTracks
  });
  
  // Separate tracks by level
  const beginnerTracks = tracks?.filter(track => track.level === 1) || [];
  const intermediateTracks = tracks?.filter(track => track.level === 2) || [];
  const advancedTracks = tracks?.filter(track => track.level === 3) || [];
  
  // Fetch user progress for each track
  useEffect(() => {
    if (!user || !tracks) return;
    
    const fetchProgress = async () => {
      const progressMap: Record<string, number> = {};
      
      for (const track of tracks) {
        try {
          const progress = await getUserProgress(user.id, track.id);
          if (progress) {
            progressMap[track.id] = progress.progress_percentage;
          }
        } catch (error) {
          console.error(`Error fetching progress for track ${track.id}:`, error);
        }
      }
      
      setUserProgressMap(progressMap);
    };
    
    fetchProgress();
  }, [user, tracks]);
  
  // Render a grid of track cards
  const renderTrackGrid = (tracks: LearningTrack[]) => {
    if (tracks.length === 0) {
      return (
        <div className="text-center py-10 text-muted-foreground">
          No learning tracks available in this category yet.
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map(track => (
          <TrackCard 
            key={track.id} 
            track={track} 
            progress={userProgressMap[track.id] || 0} 
          />
        ))}
      </div>
    );
  };
  
  const renderSkeletonGrid = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <Skeleton className="h-40 w-full" />
            <div className="p-6 space-y-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <div className="pt-2">
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="pt-4">
                <Skeleton className="h-2 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col space-y-1.5 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Learning Tracks</h2>
          <p className="text-muted-foreground">
            Explore our collection of structured learning paths designed to build your programming skills.
          </p>
        </div>
        
        <Tabs defaultValue="beginner" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="enrolled">My Tracks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="beginner">
            {isLoading ? renderSkeletonGrid() : renderTrackGrid(beginnerTracks)}
          </TabsContent>
          
          <TabsContent value="intermediate">
            {isLoading ? renderSkeletonGrid() : renderTrackGrid(intermediateTracks)}
          </TabsContent>
          
          <TabsContent value="advanced">
            {isLoading ? renderSkeletonGrid() : renderTrackGrid(advancedTracks)}
          </TabsContent>
          
          <TabsContent value="enrolled">
            {isLoading ? renderSkeletonGrid() : (
              <div>
                {renderTrackGrid(tracks?.filter(track => userProgressMap[track.id] > 0) || [])}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LearningPage;
