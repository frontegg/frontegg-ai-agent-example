import { AgentChat } from '@/components/AgentChat';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <ThemeToggle />
      <div className="w-full max-w-[900px] h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-blue-100 dark:border-gray-700">
        <AgentChat />
      </div>
    </main>
  );
} 