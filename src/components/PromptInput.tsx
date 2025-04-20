import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  disabled?: boolean;
}

export function PromptInput({ onSubmit, disabled = false }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to recalculate
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Set new height, max 200px
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [prompt]); // Adjust height when prompt changes

  const handleSubmit = () => {
    if (prompt.trim() && !disabled) {
      onSubmit(prompt);
      setPrompt('');
      // Reset textarea height after submission
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative flex flex-col p-4 bg-white dark:bg-gray-800 border-t border-blue-100 dark:border-gray-700">
      <div className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 p-2 rounded-lg border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
          style={{
            minHeight: '40px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}
          disabled={disabled}
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !prompt.trim()}
          className="self-end px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-purple-600 transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
} 