import { AgentChat } from '@/components/AgentChat';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-[480px] h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <AgentChat />
      </div>
    </main>
  );
} 