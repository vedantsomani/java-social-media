import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryUser {
  id: string;
  username: string;
  avatar: string;
}

interface StoryData {
  id: string;
  user: StoryUser;
  imageUrl: string;
  createdAt: string;
}

interface StoryProps {
  storyId: string;
  stories: StoryData[];
  onClose: () => void;
}

const Story: React.FC<StoryProps> = ({ storyId, stories, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(stories.findIndex(s => s.id === storyId));
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const currentStory = stories[currentIndex];
  
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            // Go to next story
            if (currentIndex < stories.length - 1) {
              setCurrentIndex(prev => prev + 1);
              return 0;
            } else {
              // Close the story viewer when all stories are viewed
              onClose();
              return 0;
            }
          }
          return prev + 1;
        });
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [currentIndex, isPaused, stories.length, onClose]);
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="relative max-w-md w-full h-full md:h-[80vh] md:rounded-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-10 flex p-2 gap-1">
          {stories.map((_, index) => (
            <div 
              key={index} 
              className="h-0.5 bg-gray-500 bg-opacity-50 flex-1 rounded-full overflow-hidden"
            >
              {index === currentIndex && (
                <div 
                  className="h-full bg-white" 
                  style={{ width: `${progress}%` }} 
                />
              )}
              {index < currentIndex && (
                <div className="h-full bg-white w-full" />
              )}
            </div>
          ))}
        </div>
        
        {/* Story Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 pt-6">
          <div className="flex items-center">
            <img 
              src={currentStory.user.avatar} 
              alt={currentStory.user.username} 
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <div>
              <p className="text-white text-sm font-medium">{currentStory.user.username}</p>
              <p className="text-white text-xs opacity-70">
                {new Date(currentStory.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>
        
        {/* Story Image */}
        <div 
          className="h-full w-full bg-black flex items-center justify-center"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <img 
            src={currentStory.imageUrl} 
            alt="Story" 
            className="h-full w-full object-contain"
          />
        </div>
        
        {/* Navigation Buttons */}
        <button 
          className="absolute left-0 top-0 bottom-0 w-1/4 h-full flex items-center justify-start z-10 opacity-0"
          onClick={handlePrev}
        >
          <ChevronLeft size={36} className="text-white" />
        </button>
        
        <button 
          className="absolute right-0 top-0 bottom-0 w-1/4 h-full flex items-center justify-end z-10 opacity-0"
          onClick={handleNext}
        >
          <ChevronRight size={36} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Story;