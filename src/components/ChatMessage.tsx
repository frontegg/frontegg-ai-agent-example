'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as shiki from 'shiki';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UserInfo {
  profilePictureUrl?: string | null;
  name?: string | null;
}

interface ChatMessageProps {
  message: Message;
  user?: UserInfo | null;
}

export function ChatMessage({ message, user }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [highlighter, setHighlighter] = useState<shiki.Highlighter | null>(null);

  useEffect(() => {
    const initHighlighter = async () => {
      const highlighter = await shiki.createHighlighter({
        themes: ['one-dark-pro'],
        langs: ['javascript', 'typescript', 'json', 'html', 'css', 'bash', 'jsx', 'tsx']
      });
      setHighlighter(highlighter);
    };
    
    initHighlighter();
  }, []);

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {isUser ? (
        <div className="flex-shrink-0 w-10 h-10 self-start rounded-full overflow-hidden">
          {user?.profilePictureUrl ? (
            <img 
              src={user.profilePictureUrl} 
              alt={user.name || 'User'} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-white text-base font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-shrink-0 w-10 h-10 self-start rounded-full overflow-hidden shadow-sm">
          <img 
            src="/jenny-logo.png" 
            alt="Jenny AI Assistant"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className={`flex-1 rounded-lg p-3 ${
        isUser 
          ? 'bg-indigo-500 text-white shadow-sm' 
          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-blue-100 dark:border-gray-700'
      }`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || '');
              
              if (match && highlighter) {
                const code = String(children).replace(/\n$/, '');
                const language = match[1];
                
                try {
                  const html = highlighter.codeToHtml(code, { 
                    lang: language,
                    themes: {
                      light: 'one-dark-pro',
                      dark: 'one-dark-pro'
                    }
                  });
                  return (
                    <div className="rounded-lg overflow-hidden my-2 bg-gray-800 border border-gray-700">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                        <span className="text-xs text-gray-400">{language}</span>
                      </div>
                      <div 
                        dangerouslySetInnerHTML={{ __html: html }}
                        className="p-4"
                      />
                    </div>
                  );
                } catch (error) {
                  console.error("Error highlighting code:", error);
                  // Fallback to simple formatting if highlighting fails
                  return (
                    <pre className="rounded-lg overflow-x-auto p-4 my-2 bg-gray-800 border border-gray-700">
                      <code>{code}</code>
                    </pre>
                  );
                }
              }
              
              return (
                <code className={`px-1.5 py-0.5 rounded text-sm ${
                  isUser 
                    ? 'bg-indigo-400/20 text-white' 
                    : 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-300'
                }`}>
                  {children}
                </code>
              );
            },
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            ul({ children }) {
              return <ul className="list-disc list-inside mb-2">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="list-decimal list-inside mb-2">{children}</ol>;
            },
            li({ children }) {
              return <li className="mb-1">{children}</li>;
            },
            a({ href, children }) {
              return (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`underline ${
                    isUser ? 'text-indigo-100 hover:text-white' : 'text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300'
                  }`}
                >
                  {children}
                </a>
              );
            }
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
} 