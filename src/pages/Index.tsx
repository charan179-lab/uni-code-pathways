
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import CourseCard from '@/components/dashboard/CourseCard';
import UpcomingAssignments from '@/components/dashboard/UpcomingAssignments';
import RecentActivity from '@/components/dashboard/RecentActivity';
import AiAssistant from '@/components/ai/AiAssistant';
import { mockCourses, mockUserStats } from '@/data/mockData';
import { Book, Code, LineChart, Star } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const activityData = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 75 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 60 },
  { day: 'Fri', minutes: 90 },
  { day: 'Sat', minutes: 120 },
  { day: 'Sun', minutes: 60 },
];

const Dashboard = () => {
  const stats = mockUserStats[0];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Enrolled Courses"
            value={mockCourses.length}
            icon={<Book className="h-5 w-5" />}
          />
          <StatCard
            title="Coding Problems"
            value={`${stats.solvedProblems}/${stats.totalAttempts}`}
            description="Problems solved"
            icon={<Code className="h-5 w-5" />}
          />
          <StatCard
            title="Current Streak"
            value={stats.streak}
            description="days in a row"
            icon={<Star className="h-5 w-5" />}
          />
          <StatCard
            title="Skill Level"
            value={(Object.values(stats.skillLevels).reduce((sum, val) => sum + val, 0) / Object.values(stats.skillLevels).length).toFixed(0)}
            description="average across skills"
            icon={<LineChart className="h-5 w-5" />}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={activityData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="minutes" 
                      stroke="#2c7a7b" 
                      fill="#2c7a7b" 
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div>
            <AiAssistant />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UpcomingAssignments />
          <RecentActivity />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
