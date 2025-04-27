import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage, Message } from './ChatMessage';
import { PromptInput } from './PromptInput';
import { ContextHolder, useAuth } from '@frontegg/react';

interface AgentChatProps {
  onLogin: () => void;
  isAuthenticated: boolean;
}

export function AgentChat({ onLogin, isAuthenticated }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Add initial welcome message on authentication
  useEffect(() => {
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
  }, [isAuthenticated]); // Re-run when authentication state changes

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (prompt: string) => {
    if (!prompt.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: prompt }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': isAuthenticated ? `Bearer ${ContextHolder.default().getAccessToken()}` : '',
        },
        body: JSON.stringify({ 
          message: prompt,
          history: messages 
        }),
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);

      // If agent indicates login redirect and user is not authenticated
      if (!isAuthenticated && data.response.includes("redirect you to the login page")) {
        setTimeout(() => {
          onLogin();
        }, 1500);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.'
      }]);
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