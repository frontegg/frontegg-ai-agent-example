import { useEffect, useState, useRef } from 'react';
import { useAuth, useLoginWithRedirect, ContextHolder } from "@frontegg/react";
import { AgentChat } from '@/components/AgentChat';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logout = () => {
    const baseUrl = import.meta.env.VITE_FRONTEGG_BASE_URL;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location.href}`;
  };

  // Only render the UI if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full flex justify-between items-center p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-b border-blue-100 dark:border-gray-700">
        <div className="flex-1 flex items-center space-x-4">
          <div 
            className="relative flex items-center space-x-4 cursor-pointer"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            {user?.profilePictureUrl ? (
              <img 
                src={user.profilePictureUrl} 
                alt={user?.name || 'Profile'} 
                className="w-8 h-8 rounded-full border-2 border-blue-200 hover:border-blue-300 transition-colors"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
            <span className="text-gray-700 dark:text-gray-200">
              {user?.name}
            </span>

            {isProfileMenuOpen && (
              <div 
                ref={menuRef}
                className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
              >
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700">
                    Signed in as<br />
                    <span className="font-medium">{user?.email}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-center h-full">
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full max-w-[900px] h-[600px] mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-blue-100 dark:border-gray-700">
        <AgentChat isAuthenticated={isAuthenticated} />
      </div>
    </main>
  );
} 