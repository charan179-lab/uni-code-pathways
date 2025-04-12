
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCourses } from '@/data/mockData';
import { Calendar, Code, FileText } from 'lucide-react';

const UpcomingAssignments = () => {
  // Get all modules with due dates from all courses, sort by date
  const upcomingAssignments = mockCourses
    .flatMap(course => 
      course.modules
        .filter(module => module.dueDate && new Date(module.dueDate) > new Date())
        .map(module => ({
          ...module,
          courseTitle: course.title,
          courseId: course.id
        }))
    )
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5); // Only show next 5

  const getAssignmentIcon = (type: string) => {
    switch(type) {
      case 'coding':
        return <Code className="h-4 w-4" />;
      case 'quiz':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getAssignmentBadgeColor = (type: string) => {
    switch(type) {
      case 'coding':
        return 'bg-blue-500/10 text-blue-500';
      case 'quiz':
        return 'bg-amber-500/10 text-amber-500';
      case 'assignment':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upcoming Assignments</CardTitle>
        <CardDescription>Your deadlines for the next few days</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingAssignments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAssignments.map(assignment => (
              <div key={assignment.id} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100">
                  {getAssignmentIcon(assignment.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">{assignment.title}</p>
                    <Badge variant="outline" className={getAssignmentBadgeColor(assignment.type)}>
                      {assignment.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{assignment.courseTitle}</p>
                </div>
                <div className="flex items-center whitespace-nowrap">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-xs">
                    {new Date(assignment.dueDate!).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No upcoming assignments</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAssignments;
