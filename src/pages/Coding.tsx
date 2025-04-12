
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockCodingProblems } from '@/data/mockData';
import CodeEditor from '@/components/coding/CodeEditor';
import ProblemDetails from '@/components/coding/ProblemDetails';
import AiAssistant from '@/components/ai/AiAssistant';
import { Search } from 'lucide-react';

const Coding = () => {
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const filteredProblems = mockCodingProblems.filter(problem => 
    problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    problem.category.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const selectedProblem = mockCodingProblems.find(p => p.id === selectedProblemId) || mockCodingProblems[0];
  
  const difficultyColor = {
    easy: 'bg-green-500/10 text-green-500',
    medium: 'bg-yellow-500/10 text-yellow-500',
    hard: 'bg-red-500/10 text-red-500',
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Coding Practice</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {filteredProblems.length > 0 ? (
                filteredProblems.map(problem => (
                  <Card
                    key={problem.id}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedProblemId === problem.id ? 'ring-2 ring-campusBridge-teal' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedProblemId(problem.id)}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{problem.title}</h3>
                        <Badge variant="outline" className={difficultyColor[problem.difficulty]}>
                          {problem.difficulty}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {problem.category.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs capitalize">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No problems found
                </p>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="problem" className="h-full">
              <TabsList>
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="solution">Solution</TabsTrigger>
                <TabsTrigger value="ai">AI Assistant</TabsTrigger>
              </TabsList>
              
              <div className="mt-4 border rounded-md h-[700px] overflow-hidden">
                <TabsContent value="problem" className="h-full m-0">
                  <div className="grid grid-cols-1 h-full">
                    <div className="overflow-y-auto border-b">
                      <ProblemDetails problem={selectedProblem} />
                    </div>
                    <div className="h-[400px]">
                      <CodeEditor problem={selectedProblem} />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="solution" className="h-full m-0 p-4 overflow-auto">
                  <div className="prose max-w-none">
                    <h3>Solution Approach</h3>
                    <p>This is a placeholder for the solution explanation. In the actual platform, this would contain a detailed explanation of how to solve the problem efficiently.</p>
                    
                    <h3>Complexity Analysis</h3>
                    <ul>
                      <li><strong>Time Complexity:</strong> O(n)</li>
                      <li><strong>Space Complexity:</strong> O(n)</li>
                    </ul>
                    
                    <h3>Sample Solution</h3>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                      {`function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`}
                    </pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="ai" className="h-full m-0 p-4">
                  <AiAssistant />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Coding;
