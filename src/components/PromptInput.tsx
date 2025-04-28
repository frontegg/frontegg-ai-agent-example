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
    <div className="px-4 py-4 bg-white dark:bg-gray-800">
      <div className="flex gap-2 items-stretch max-w-[1200px] mx-auto">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 min-h-[44px] px-3 py-3 rounded-lg border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            lineHeight: '1.5',
            display: 'flex',
            alignItems: 'center'
          }}
          disabled={disabled}
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !prompt.trim()}
          className="px-4 h-11 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-purple-600 transition-all duration-200 flex items-center justify-center"
          aria-label="Send"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 19.5l16.5-7.5-16.5-7.5v6.75l11.25 0-11.25 0v6.75z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
} 