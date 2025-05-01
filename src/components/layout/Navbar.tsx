import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageCircle, Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-between items-center px-4 h-16">
        {/* Logo - Hidden when search is open on mobile */}
        <div className={`flex items-center ${isSearchOpen ? 'hidden sm:flex' : 'flex'}`}>
          <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            CampusGram
          </Link>
        </div>
        
        {/* Search Bar */}
        <div className={`flex items-center ${isSearchOpen ? 'flex-1' : 'hidden sm:flex sm:flex-1 sm:max-w-md sm:mx-4'}`}>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-100 dark:bg-gray-700 border-none rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for people, clubs, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isSearchOpen && (
              <button 
                className="absolute inset-y-0 right-0 flex items-center pr-3 sm:hidden"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={18} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile Search Icon - Only visible on mobile when search is closed */}
        <div className={`sm:hidden ${isSearchOpen ? 'hidden' : 'block'}`}>
          <button 
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} />
          </button>
        </div>
        
        {/* Navigation Icons */}
        <div className={`flex items-center space-x-4 ${isSearchOpen ? 'hidden sm:flex' : 'flex'}`}>
          <Link to="/messages" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <MessageCircle size={20} />
          </Link>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Bell size={20} />
          </button>
          <button 
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <Link to={`/profile/${user?.username}`} className="flex items-center">
            <img 
              src={user?.avatar || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"} 
              alt="Profile" 
              className="h-8 w-8 rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;