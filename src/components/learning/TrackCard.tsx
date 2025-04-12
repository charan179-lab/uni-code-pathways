
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, BookOpen } from 'lucide-react';
import { LearningTrack } from '@/services/learningService';
import { Link } from 'react-router-dom';

interface TrackCardProps {
  track: LearningTrack;
  progress?: number;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, progress = 0 }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link to={`/learning/${track.id}`}>
        <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 relative">
          {track.image_url && (
            <img 
              src={track.image_url} 
              alt={track.title} 
              className="w-full h-full object-cover opacity-75"
            />
          )}
          <Badge className="absolute top-3 right-3">
            Level {track.level}
          </Badge>
        </div>
        <CardHeader className="pt-4 pb-2">
          <CardTitle>{track.title}</CardTitle>
          <CardDescription className="line-clamp-2">{track.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center text-sm text-muted-foreground">
            {track.estimated_hours && (
              <div className="flex items-center mr-4">
                <Clock className="w-4 h-4 mr-1" />
                <span>{track.estimated_hours} hours</span>
              </div>
            )}
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>Multiple modules</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-4">
          <div className="w-full">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default TrackCard;
