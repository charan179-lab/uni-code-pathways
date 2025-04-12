
import React from 'react';
import Layout from '@/components/layout/Layout';
import CourseCard from '@/components/dashboard/CourseCard';
import { mockCourses } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Courses = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">My Courses</h1>
          
          <div className="w-full md:w-auto flex items-center gap-2">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-8 w-full md:w-[250px]"
              />
            </div>
            <Button className="bg-campusBridge-blue hover:bg-campusBridge-blue/90">
              All Courses
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
