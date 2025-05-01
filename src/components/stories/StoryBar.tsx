import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Story from './Story';
import CreateStoryModal from './CreateStoryModal';

// Mock data for stories
const mockStories = [
  {
    id: '1',
    user: {
      id: '101',
      username: 'sarah_j',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    },
    imageUrl: 'https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: '2',
    user: {
      id: '102',
      username: 'mike_r',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    },
    imageUrl: 'https://images.pexels.com/photos/1181371/pexels-photo-1181371.jpeg',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: '3',
    user: {
      id: '103',
      username: 'emma_k',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
    },
    imageUrl: 'https://images.pexels.com/photos/6147118/pexels-photo-6147118.jpeg',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: '4',
    user: {
      id: '104',
      username: 'alex_t',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    },
    imageUrl: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    id: '5',
    user: {
      id: '105',
      username: 'jason_l',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
    imageUrl: 'https://images.pexels.com/photos/8471799/pexels-photo-8471799.jpeg',
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: '6',
    user: {
      id: '106',
      username: 'lisa_w',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    },
    imageUrl: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  },
];

const StoryBar: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative mb-6">
      <div 
        className="flex overflow-x-auto scrollbar-hide py-4 px-1"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {/* Create Story */}
        <div className="flex-shrink-0 w-20 mr-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center"
          >
            <div className="relative w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-1 border-2 border-gray-300 dark:border-gray-600">
              <div className="absolute -bottom-1 right-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white dark:border-gray-800">
                <Plus size={14} className="text-white" />
              </div>
              <img 
                src={user?.avatar || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"} 
                alt="Your story" 
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
            <span className="text-xs text-center">Your Story</span>
          </button>
        </div>
        
        {/* Stories */}
        {mockStories.map((story) => (
          <div key={story.id} className="flex-shrink-0 w-20 mr-4">
            <button 
              className="flex flex-col items-center"
              onClick={() => setSelectedStory(story.id)}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5 mb-1">
                <img 
                  src={story.user.avatar} 
                  alt={story.user.username} 
                  className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-800"
                />
              </div>
              <span className="text-xs text-center truncate w-full">{story.user.username}</span>
            </button>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      {showLeftArrow && (
        <button 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md z-10"
          onClick={scrollLeft}
        >
          <ChevronLeft size={20} />
        </button>
      )}
      
      {showRightArrow && (
        <button 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md z-10"
          onClick={scrollRight}
        >
          <ChevronRight size={20} />
        </button>
      )}
      
      {/* Create Story Modal */}
      {isModalOpen && (
        <CreateStoryModal onClose={() => setIsModalOpen(false)} />
      )}
      
      {/* Story Viewer */}
      {selectedStory && (
        <Story 
          storyId={selectedStory} 
          stories={mockStories} 
          onClose={() => setSelectedStory(null)} 
        />
      )}
    </div>
  );
};

export default StoryBar;