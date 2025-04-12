
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SendHorizontal } from 'lucide-react';

const AiAssistant = () => {
  const [message, setMessage] = useState<string>('');
  const [conversation, setConversation] = useState<Array<{role: string; content: string}>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Campus Bridge AI assistant. How can I help you with your coding or academic questions today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [...prev, { role: 'user', content: message }]);
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      setConversation(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: simulateAiResponse(message)
        }
      ]);
      setIsLoading(false);
    }, 1000);
    
    // Clear input field
    setMessage('');
  };

  const simulateAiResponse = (query: string): string => {
    // This is a simple simulation - in a real app, this would call an AI API
    if (query.toLowerCase().includes('help') && query.toLowerCase().includes('code')) {
      return "I'd be happy to help with your code! Could you share the specific part you're struggling with or the error message you're getting?";
    } else if (query.toLowerCase().includes('recommend') && query.toLowerCase().includes('resource')) {
      return "For learning programming, I recommend resources like freeCodeCamp, Codecademy, and MDN Web Docs for web development. What specific topic are you interested in?";
    } else if (query.toLowerCase().includes('debug')) {
      return "Let's debug your code. First, check for syntax errors like missing brackets or semicolons. Then look for logical errors in your algorithm. Could you share the specific code you're trying to debug?";
    } else {
      return "Thanks for your message. I'm a simulated AI assistant in this demo. In the actual Campus Bridge platform, I would provide helpful responses for your coding and academic questions based on advanced AI models.";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto mb-4">
          {conversation.map((entry, i) => (
            <div 
              key={i}
              className={`mb-4 ${
                entry.role === 'user' 
                  ? 'text-right' 
                  : 'text-left'
              }`}
            >
              <div
                className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                  entry.role === 'user'
                    ? 'bg-campusBridge-blue text-white'
                    : 'bg-gray-100'
                }`}
              >
                {entry.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block max-w-[80%] rounded-lg px-4 py-2 bg-gray-100">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.2s" }}></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2 mt-auto">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a question..."
            className="resize-none"
            rows={1}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AiAssistant;
