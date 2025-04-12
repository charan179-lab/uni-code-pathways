
import React from 'react';
import { CodingProblem } from '@/types';
import { Badge } from '@/components/ui/badge';

interface ProblemDetailsProps {
  problem: CodingProblem;
}

const ProblemDetails: React.FC<ProblemDetailsProps> = ({ problem }) => {
  const difficultyColor = {
    easy: 'bg-green-500/10 text-green-500',
    medium: 'bg-yellow-500/10 text-yellow-500',
    hard: 'bg-red-500/10 text-red-500',
  }[problem.difficulty];

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{problem.title}</h2>
          <Badge variant="outline" className={difficultyColor}>
            {problem.difficulty}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {problem.category.map(tag => (
            <Badge key={tag} variant="secondary" className="capitalize">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="prose max-w-none">
        <h3>Problem Description</h3>
        <p>{problem.description}</p>
        
        <h3>Examples</h3>
        <div className="space-y-4">
          {problem.testCases.filter(tc => !tc.isHidden).map((tc, index) => (
            <div key={tc.id} className="p-3 bg-gray-50 rounded-md">
              <p><strong>Example {index + 1}:</strong></p>
              <div>
                <p><strong>Input:</strong> <code>{tc.input}</code></p>
                <p><strong>Output:</strong> <code>{tc.expectedOutput}</code></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;
