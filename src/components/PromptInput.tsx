'use client';

import React, { useState, KeyboardEvent } from 'react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  disabled?: boolean;
}

export function PromptInput({ onSubmit, disabled = false }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim() && !disabled) {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-end gap-2 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-1 min-h-[40px] max-h-[200px] p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !prompt.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </div>
  );
} 