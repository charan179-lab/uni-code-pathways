
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play } from 'lucide-react';
import { CodingProblem } from '@/types';

interface CodeEditorProps {
  problem: CodingProblem;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ problem }) => {
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState<string>(problem.starterCode[language] || '');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const languages = Object.keys(problem.starterCode);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(problem.starterCode[value] || '');
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const runCode = () => {
    setIsRunning(true);
    // Simulate code execution with a delay
    setTimeout(() => {
      setOutput('// This is a simulated output.\n// In a real implementation, this would execute your code against test cases.\n\n// Test case 1: ' + problem.testCases[0].input + '\n// Expected: ' + problem.testCases[0].expectedOutput);
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between bg-gray-100 p-2 border-b">
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={runCode} 
          disabled={isRunning}
          className="bg-campusBridge-teal hover:bg-campusBridge-teal/90"
        >
          <Play className="h-4 w-4 mr-2" />
          {isRunning ? 'Running...' : 'Run Code'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-full">
        <div className="h-full">
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="code-editor"
            placeholder="Write your code here..."
            spellCheck="false"
          />
        </div>
        <div className="h-full">
          <textarea
            value={output}
            readOnly
            className="code-editor bg-gray-800"
            placeholder="Output will appear here..."
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
