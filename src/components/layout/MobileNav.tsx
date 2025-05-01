import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Users, Newspaper, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const MobileNav: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navItems = [
    { path: '/', icon: <Home size={24} />, label: 'Home' },
    { path: '/explore', icon: <Compass size={24} />, label: 'Explore' },
    { path: '/clubs', icon: <Users size={24} />, label: 'Clubs' },
    { path: '/news', icon: <Newspaper size={24} />, label: 'News' },
    { 
      path: `/profile/${user?.username}`, 
      icon: (
        <img 
          src={user?.avatar || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"} 
          alt="Profile" 
          className="h-6 w-6 rounded-full object-cover"
        />
      ), 
      label: 'Profile' 
    },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 z-50">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 text-xs font-medium ${
              location.pathname === item.path
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <div className="mb-1">{item.icon}</div>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;