import React, { useState } from 'react';
import { Newspaper, Calendar, Bell, ExternalLink, Pin, Share2 } from 'lucide-react';

// Mock news data
const mockNews = [
  {
    id: '1',
    title: 'Fall Festival This Weekend',
    content: 'Join us for the annual Fall Festival on the quad this Saturday from 12-5pm. There will be food, games, and performances by student organizations. In case of rain, the event will be moved to the Student Union Building.',
    image: 'https://images.pexels.com/photos/1150988/pexels-photo-1150988.jpeg',
    date: '2025-10-15',
    source: 'Student Activities Committee',
    category: 'Events',
    pinned: true,
  },
  {
    id: '2',
    title: 'New Computer Science Building Opening',
    content: 'The state-of-the-art CS building will open next month with expanded lab spaces, study rooms, and the latest technology. Students in the Computer Science program will have priority access to the new facilities, which include VR development stations and high-performance computing clusters.',
    image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg',
    date: '2025-10-14',
    source: 'Campus Development',
    category: 'Announcements',
    pinned: false,
  },
  {
    id: '3',
    title: 'Basketball Team Heads to Finals',
    content: 'Our basketball team has qualified for the championship finals after an impressive season. The final game will be held at the main arena next Friday at 7pm. Student ID holders get free admission, while tickets for the general public are available online.',
    image: 'https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg',
    date: '2025-10-12',
    source: 'Athletics Department',
    category: 'Sports',
    pinned: false,
  },
  {
    id: '4',
    title: 'Library Extends Hours During Finals Week',
    content: 'The main campus library will be open 24/7 during finals week to accommodate student study needs. Additional quiet study spaces will be available on the third floor, and the cafe will extend its hours until midnight each day.',
    image: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg',
    date: '2025-10-10',
    source: 'Campus Library',
    category: 'Academics',
    pinned: false,
  },
  {
    id: '5',
    title: 'Career Fair Coming Next Month',
    content: 'The annual Career Fair will take place in the Event Center on November 15th. Over 100 companies will be in attendance, offering full-time positions and internships. Don\'t forget to bring copies of your resume and dress professionally.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    date: '2025-10-08',
    source: 'Career Services',
    category: 'Career',
    pinned: false,
  },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All News' },
  { id: 'events', name: 'Events' },
  { id: 'announcements', name: 'Announcements' },
  { id: 'academics', name: 'Academics' },
  { id: 'sports', name: 'Sports' },
  { id: 'career', name: 'Career' },
];

const CollegeNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [subscribed, setSubscribed] = useState(false);
  
  const filteredNews = selectedCategory === 'all' 
    ? mockNews 
    : mockNews.filter(item => item.category.toLowerCase() === selectedCategory);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Newspaper className="mr-2" /> 
          College News
        </h1>
        <button 
          onClick={() => setSubscribed(!subscribed)}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            subscribed 
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100' 
              : 'bg-blue-600 text-white'
          }`}
        >
          <Bell size={16} className="mr-2" />
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      
      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 no-scrollbar space-x-2 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* News List */}
      <div className="space-y-6">
        {filteredNews.map(news => (
          <div 
            key={news.id} 
            className={`bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-all ${
              news.pinned ? 'border-l-4 border-blue-600 dark:border-blue-500' : ''
            }`}
          >
            {news.image && (
              <div className="h-40 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  {news.pinned && (
                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">
                      <Pin size={14} className="mr-1" />
                      Pinned
                    </div>
                  )}
                  <h3 className="text-lg font-semibold">{news.title}</h3>
                </div>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
                  {news.category}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">{news.content}</p>
              
              <div className="flex flex-wrap justify-between items-center text-sm">
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(news.date)}
                  <span className="mx-2">•</span>
                  {news.source}
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <ExternalLink size={16} className="mr-1" />
                    Read More
                  </button>
                  <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <Share2 size={16} className="mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeNews;