
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Course } from '@/types';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Calculate progress based on completed modules
  const completedModules = course.modules.filter(module => module.completed).length;
  const progressPercentage = course.modules.length > 0 
    ? Math.round((completedModules / course.modules.length) * 100)
    : 0;

  // Get the next due module, if any
  const nextDueModule = course.modules
    .filter(module => module.dueDate && new Date(module.dueDate) > new Date())
    .sort((a, b) => 
      new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime()
    )[0];

  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="overflow-hidden card-hover h-full">
        <div 
          className="h-32 bg-cover bg-center" 
          style={{ 
            backgroundImage: course.thumbnail 
              ? `url(${course.thumbnail})` 
              : 'linear-gradient(to right, var(--tw-gradient-stops))',
            backgroundPosition: 'center',
          }}
        />
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-1">{course.title}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <span className="line-clamp-1">Instructor: {course.instructor}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-sm">
            <span>{progressPercentage}% complete</span>
            <span>{completedModules}/{course.modules.length} modules</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between items-center">
          <Badge variant="outline" className="bg-campusBridge-teal/10">
            {course.enrolledCount} students
          </Badge>
          {nextDueModule && (
            <div className="text-xs text-muted-foreground">
              Next due: {nextDueModule.dueDate?.toLocaleDateString()}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
