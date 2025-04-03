import '../styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qualification Agent - ReAct AI',
  description: 'AI agent for company qualification using LangChain ReAct framework',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        {children}
      </body>
    </html>
  );
} 