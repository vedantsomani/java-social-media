import React from 'react';
import PostList from '../components/posts/PostList';
import { Newspaper } from 'lucide-react';

// Mock news data
const mockNews = [
  {
    id: '1',
    title: 'Fall Festival This Weekend',
    excerpt: 'Join us for the annual Fall Festival on the quad this Saturday...',
    date: 'Today',
  },
  {
    id: '2',
    title: 'New Computer Science Building Opening',
    excerpt: 'The state-of-the-art CS building will open next month with...',
    date: 'Yesterday',
  },
  {
    id: '3',
    title: 'Basketball Team Heads to Finals',
    excerpt: 'Our basketball team has qualified for the championship...',
    date: '2 days ago',
  },
];

const Home: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:space-x-6">
      {/* Main content - Post feed */}
      <div className="w-full md:w-2/3">
        <PostList />
      </div>
      
      {/* Sidebar - News and suggestions */}
      <div className="hidden md:block md:w-1/3 space-y-6">
        {/* College News Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <div className="flex items-center">
              <Newspaper size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold">College News</h3>
            </div>
            <a href="/news" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              See All
            </a>
          </div>
          
          <div className="p-4">
            <ul className="space-y-4">
              {mockNews.map(item => (
                <li key={item.id}>
                  <a href={`/news/${item.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md -mx-2">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.excerpt}</p>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 block">{item.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-xs text-gray-400 dark:text-gray-500 space-y-3">
          <div className="flex flex-wrap gap-2">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">Press</a>
            <a href="#" className="hover:underline">API</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Locations</a>
          </div>
          <p>© 2025 CampusGram</p>
        </div>
      </div>
    </div>
  );
};

export default Home;