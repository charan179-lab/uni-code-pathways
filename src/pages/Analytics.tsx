
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockUserStats } from '@/data/mockData';
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Analytics = () => {
  const stats = mockUserStats[0];
  
  const skillChartData = Object.entries(stats.skillLevels).map(([key, value]) => ({
    subject: key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    value,
    fullMark: 100,
  }));
  
  const weeklyData = [
    { name: 'Week 1', problems: 5 },
    { name: 'Week 2', problems: 8 },
    { name: 'Week 3', problems: 6 },
    { name: 'Week 4', problems: 10 },
    { name: 'Week 5', problems: 7 },
    { name: 'Week 6', problems: 12 },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Analytics &amp; Progress</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Problem Solving</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.solvedProblems}/{stats.totalAttempts}</div>
              <Progress 
                value={(stats.solvedProblems / stats.totalAttempts) * 100} 
                className="h-2 mt-2" 
              />
              <p className="text-xs text-muted-foreground mt-1">
                {((stats.solvedProblems / stats.totalAttempts) * 100).toFixed(0)}% success rate
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.streak} days</div>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i < stats.streak % 7 ? 'bg-campusBridge-teal' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Keep it going!
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67%</div>
              <Progress value={67} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Average across all courses
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Placement Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72%</div>
              <Progress value={72} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Based on skill assessment
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Problem Solving</CardTitle>
              <CardDescription>
                Number of problems solved per week
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="problems" fill="#2c7a7b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skill Distribution</CardTitle>
              <CardDescription>
                Performance across different skill areas
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={skillChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="#1a365d"
                    fill="#1a365d"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Improvement Recommendations</CardTitle>
              <CardDescription>
                Based on your performance analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(stats.skillLevels)
                  .sort(([, a], [, b]) => a - b)
                  .slice(0, 2)
                  .map(([skill, level]) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium capitalize">
                          {skill.split('-').join(' ')}
                        </h3>
                        <span>{level}%</span>
                      </div>
                      <Progress value={level} className="h-2 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {skill === 'problem-solving' && 
                          'Focus on improving your problem-solving skills by practicing more algorithmic challenges.'}
                        {skill === 'time-complexity' && 
                          'Work on understanding Big O notation and optimizing your solutions for better time complexity.'}
                        {skill === 'data-structures' && 
                          'Strengthen your knowledge of data structures like trees, graphs, and hash tables.'}
                        {skill === 'algorithms' && 
                          'Practice implementing common algorithms like sorting, searching, and graph traversal.'}
                      </p>
                      <div className="mt-2 text-sm">
                        <a href="#" className="text-campusBridge-teal hover:underline">
                          Recommended practice problems →
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
