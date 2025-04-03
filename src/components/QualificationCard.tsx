'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface QualificationCardProps {
  result: string;
}

export function QualificationCard({ result }: QualificationCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Qualification Result
      </h3>
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
      </div>
    </div>
  );
} 