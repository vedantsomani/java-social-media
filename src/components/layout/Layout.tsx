import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import StoryBar from '../stories/StoryBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="flex flex-1 pt-16">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden md:block w-64 fixed h-full pt-2">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 md:ml-64 px-4 py-6">
          {isHomePage && <StoryBar />}
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Navigation - Only visible on mobile */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

export default Layout;