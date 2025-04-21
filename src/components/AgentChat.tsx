import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage, Message } from './ChatMessage';
import { PromptInput } from './PromptInput';
import { QualificationCard } from './QualificationCard';

interface QualificationResult {
  output: string;
}

export function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [qualificationResult, setQualificationResult] = useState<QualificationResult | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial welcome message on mount
  React.useEffect(() => {
    setMessages([
      { role: 'assistant', content: "Hi there! I'm Jenny, your Customer Commitment Lifecycle agent. How can I help you track feature commitments today?" }
    ]);
  }, []); // Empty dependency array ensures this runs only once on mount

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (prompt: string) => {
    if (!prompt.trim()) return;

    const newMessage: Message = { role: 'user', content: prompt };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    // Construct API URL from environment variable
    // Ensure VITE_ prefix is used for client-side env vars
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/agent`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: typeof data.response === 'string' ? data.response : JSON.stringify(data.response)
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      if (data.qualificationResult) {
        setQualificationResult(data.qualificationResult);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 pt-6">
        <div className="px-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />

          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-center p-4"
              >
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {qualificationResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4"
              >
                <QualificationCard result={qualificationResult.output} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-auto border-t border-blue-100 dark:border-gray-700">
        <PromptInput onSubmit={handleSubmit} disabled={isLoading} />
      </div>
    </div>
  );
} 