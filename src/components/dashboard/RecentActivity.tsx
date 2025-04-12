
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clock, Code, FileText } from 'lucide-react';

const activities = [
  {
    id: '1',
    action: 'Completed assignment',
    item: 'Introduction to Arrays',
    course: 'Data Structures and Algorithms',
    time: '2 hours ago',
    icon: <Check className="h-4 w-4" />,
  },
  {
    id: '2',
    action: 'Submitted code',
    item: 'Two Sum Problem',
    course: 'Data Structures and Algorithms',
    time: '5 hours ago',
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: '3',
    action: 'Started quiz',
    item: 'JavaScript Fundamentals',
    course: 'Web Development',
    time: '1 day ago',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: '4',
    action: 'Viewed lecture',
    item: 'Introduction to Algorithms',
    course: 'Data Structures and Algorithms',
    time: '2 days ago',
    icon: <Clock className="h-4 w-4" />,
  },
];

const RecentActivity = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions across courses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted">
                {activity.icon}
              </div>
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.item} • {activity.course}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
