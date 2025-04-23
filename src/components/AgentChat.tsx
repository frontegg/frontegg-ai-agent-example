import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage, Message } from './ChatMessage';
import { PromptInput } from './PromptInput';
import { ContextHolder, useAuth } from '@frontegg/react';

interface QualificationResult {
  output: string;
}

interface AgentChatProps {
  onLogin: () => void;
  isAuthenticated: boolean;
}

export function AgentChat({ onLogin, isAuthenticated }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [qualificationResult, setQualificationResult] = useState<QualificationResult | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Add initial welcome message on mount
  React.useEffect(() => {
    if (!isAuthenticated) {
      setMessages([
        { 
          role: 'assistant', 
          content: "Hi there! I'm Jenny, your Customer Commitment Lifecycle agent. Before we can get started, I'll need you to log in. This helps me securely access the tools I need to help you track feature commitments. Would you like to log in now?" 
        }
      ]);
    } else {
      setMessages([
        { 
          role: 'assistant', 
          content: `Hi ${user?.name || 'there'}! I'm Jenny, your Customer Commitment Lifecycle agent. How can I help you track feature commitments today?` 
        }
      ]);
    }
  }, [isAuthenticated, user?.name]); // Re-run when authentication state or user name changes

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (prompt: string) => {
    if (!prompt.trim()) return;

    // If not authenticated and user types anything like "yes", "okay", "sure", etc.
    if (!isAuthenticated && /^(yes|yeah|sure|ok|okay|login|log in|signin|sign in)/i.test(prompt)) {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: prompt },
        { role: 'assistant', content: "Great! I'll redirect you to the login page now." }
      ]);
      setTimeout(() => {
        onLogin();
      }, 1500);
      return;
    }

    // If not authenticated, remind the user to log in
    if (!isAuthenticated) {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: prompt },
        { 
          role: 'assistant', 
          content: "I apologize, but I need you to log in first before I can help you with that. Would you like to log in now?" 
        }
      ]);
      return;
    }

    const newMessage: Message = { role: 'user', content: prompt };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    // Construct API URL from environment variable
    // Ensure VITE_ prefix is used for client-side env vars
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/agent`;
    const token = ContextHolder.default().getAccessToken();

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ 
          message: prompt,
          history: messages // Send the entire conversation history
        }),
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
      <div className="flex-1 overflow-y-auto pt-6">
        <div className="px-4 space-y-6">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} user={user} />
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
        </div>
      </div>

      <div className="mt-auto border-t border-blue-100 dark:border-gray-700">
        <PromptInput onSubmit={handleSubmit} disabled={isLoading} />
      </div>
    </div>
  );
} 