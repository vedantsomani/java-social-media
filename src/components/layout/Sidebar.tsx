import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Users, Newspaper, MessageCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const navItems = [
    { path: '/', icon: <Home size={24} />, label: 'Home' },
    { path: '/explore', icon: <Compass size={24} />, label: 'Explore' },
    { path: '/clubs', icon: <Users size={24} />, label: 'Clubs' },
    { path: '/news', icon: <Newspaper size={24} />, label: 'College News' },
    { path: '/messages', icon: <MessageCircle size={24} />, label: 'Messages' },
  ];
  
  return (
    <div className="h-full overflow-y-auto py-4 px-3 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col justify-between h-full">
        <div>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 text-base font-normal rounded-lg group transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="mr-3">{item.icon}</div>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={`/profile/${user?.username}`}
                className={`flex items-center p-2 text-base font-normal rounded-lg group transition-colors ${
                  location.pathname === `/profile/${user?.username}`
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="mr-3">
                  <img 
                    src={user?.avatar || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"} 
                    alt="Profile" 
                    className="h-6 w-6 rounded-full object-cover"
                  />
                </div>
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center p-2 text-base font-normal text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors"
        >
          <div className="mr-3">
            <LogOut size={24} />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;