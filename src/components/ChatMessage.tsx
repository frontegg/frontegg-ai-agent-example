'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
        <span className="text-sm font-medium text-white">
          {isUser ? 'U' : 'A'}
        </span>
      </div>
      
      <div className={`flex-1 rounded-lg p-3 ${
        isUser 
          ? 'bg-blue-500 text-white dark:bg-blue-600' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
      }`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <div className="rounded-lg overflow-hidden my-2 bg-gray-800">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                    <span className="text-xs text-gray-400">{match[1]}</span>
                  </div>
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ margin: 0, borderRadius: 0 }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={`px-1.5 py-0.5 rounded text-sm ${
                  isUser 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600'
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
                    isUser ? 'text-white' : 'text-blue-500 dark:text-blue-400'
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