import React, { useState } from 'react';
import { Compass, Search, TrendingUp, Hash } from 'lucide-react';

// Mock explore data for trending topics
const trendingTopics = [
  { id: '1', name: 'Finals Week', count: 235 },
  { id: '2', name: 'Campus Concert', count: 184 },
  { id: '3', name: 'Football Game', count: 159 },
  { id: '4', name: 'Study Groups', count: 127 },
  { id: '5', name: 'Internships', count: 98 },
];

// Mock explore data for discover sections
const discoverSections = [
  {
    id: '1',
    title: 'Popular Campus Spots',
    images: [
      'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg',
      'https://images.pexels.com/photos/1181371/pexels-photo-1181371.jpeg',
      'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
      'https://images.pexels.com/photos/159752/library-la-trobe-study-students-159752.jpeg',
    ],
  },
  {
    id: '2',
    title: 'Student Life',
    images: [
      'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg',
      'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
      'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg',
      'https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg',
    ],
  },
  {
    id: '3',
    title: 'Campus Events',
    images: [
      'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg',
      'https://images.pexels.com/photos/433452/pexels-photo-433452.jpeg',
      'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
      'https://images.pexels.com/photos/3321797/pexels-photo-3321797.jpeg',
    ],
  },
];

// Mock hashtags
const popularHashtags = [
  '#CollegeLife',
  '#StudyBuddies',
  '#CampusFood',
  '#DormLife',
  '#Midterms',
  '#ClassOf2025',
  '#UniversityEvents',
  '#StudentOrgs',
  '#CollegeSports',
  '#Finals',
];

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Compass className="mr-2" /> 
          Explore
        </h1>
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search photos, people, or hashtags..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      
      {/* Trending Topics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <TrendingUp size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
          Trending on Campus
        </h2>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={topic.id} className="flex items-center">
              <span className="text-xl font-semibold text-gray-400 dark:text-gray-500 w-8">
                {index + 1}
              </span>
              <div>
                <h3 className="font-medium">{topic.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {topic.count} posts
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Popular Hashtags */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <Hash size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
          Popular Hashtags
        </h2>
        <div className="flex flex-wrap gap-2">
          {popularHashtags.map((hashtag) => (
            <a 
              key={hashtag} 
              href={`#${hashtag}`}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 px-3 py-1.5 rounded-full text-sm transition-colors"
            >
              {hashtag}
            </a>
          ))}
        </div>
      </div>
      
      {/* Discover Sections */}
      {discoverSections.map(section => (
        <div key={section.id} className="mb-8">
          <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {section.images.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={image} 
                  alt={`${section.title} ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Explore;