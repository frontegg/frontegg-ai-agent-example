import '../styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Commitment Lifecycle Agent',
	description:
		'A demonstration project showcasing how to build AI agents using Frontegg AI framework SDK for authentication, third-party integrations, and user context management. Features a B2B agent that manages product commitments through Slack, Jira, HubSpot, and Google Calendar integrations.',
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