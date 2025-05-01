import React, { useState } from 'react';
import { Users, Search, Filter, ArrowRight, Star, Calendar, MapPin, ExternalLink } from 'lucide-react';

// Mock clubs data
const mockClubs = [
  {
    id: '1',
    name: 'Computer Science Club',
    description: 'Learn programming, join hackathons, and network with tech professionals.',
    image: 'https://images.pexels.com/photos/7054704/pexels-photo-7054704.jpeg',
    memberCount: 128,
    category: 'Academic',
    featured: true,
    meetings: 'Wednesdays at 6pm',
    location: 'Tech Building, Room 305',
    website: 'csclub.college.edu',
    tags: ['programming', 'hackathon', 'networking'],
  },
  {
    id: '2',
    name: 'Environmental Action',
    description: 'Working to create a more sustainable campus and community through projects and advocacy.',
    image: 'https://images.pexels.com/photos/2559749/pexels-photo-2559749.jpeg',
    memberCount: 95,
    category: 'Service',
    featured: false,
    meetings: 'Mondays at 5pm',
    location: 'Science Hall, Room 110',
    website: 'eco.college.edu',
    tags: ['environment', 'sustainability', 'service'],
  },
  {
    id: '3',
    name: 'Photography Society',
    description: 'Improve your photography skills, participate in photo walks, and showcase your work in exhibitions.',
    image: 'https://images.pexels.com/photos/1777086/pexels-photo-1777086.jpeg',
    memberCount: 64,
    category: 'Art',
    featured: false,
    meetings: 'Tuesdays at 7pm',
    location: 'Arts Building, Room 210',
    website: 'photo.college.edu',
    tags: ['photography', 'art', 'exhibition'],
  },
  {
    id: '4',
    name: 'Debate Team',
    description: 'Participate in collegiate debate competitions and develop your public speaking skills.',
    image: 'https://images.pexels.com/photos/6883762/pexels-photo-6883762.jpeg',
    memberCount: 32,
    category: 'Academic',
    featured: true,
    meetings: 'Fridays at 4pm',
    location: 'Humanities Building, Room 120',
    website: 'debate.college.edu',
    tags: ['debate', 'public speaking', 'competition'],
  },
  {
    id: '5',
    name: 'Dance Crew',
    description: 'Learn various dance styles and perform at campus events and competitions.',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg',
    memberCount: 56,
    category: 'Performance',
    featured: false,
    meetings: 'Saturdays at 2pm',
    location: 'Student Center, Dance Studio',
    website: 'dance.college.edu',
    tags: ['dance', 'performance', 'choreography'],
  },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Clubs' },
  { id: 'academic', name: 'Academic' },
  { id: 'service', name: 'Service' },
  { id: 'art', name: 'Art' },
  { id: 'performance', name: 'Performance' },
  { id: 'sports', name: 'Sports' },
];

const Clubs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter clubs based on category and search query
  const filteredClubs = mockClubs.filter(club => {
    const matchesCategory = selectedCategory === 'all' || club.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          club.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  // Get selected club details
  const clubDetails = selectedClub ? mockClubs.find(club => club.id === selectedClub) : null;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="mr-2" /> 
          Campus Clubs
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
          Create Club
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for clubs, interests, or activities..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        {/* Categories */}
        <div className="flex overflow-x-auto pb-2 no-scrollbar space-x-2">
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
      </div>
      
      {/* Featured Clubs - Only show when no search is active */}
      {searchQuery === '' && selectedCategory === 'all' && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Star size={18} className="mr-2 text-yellow-500" />
            Featured Clubs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockClubs
              .filter(club => club.featured)
              .map(club => (
                <div 
                  key={club.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedClub(club.id)}
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={club.image} 
                      alt={club.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{club.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {club.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
                        {club.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {club.memberCount} members
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      
      {/* All Clubs */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          {searchQuery ? 'Search Results' : 'All Clubs'}
          {filteredClubs.length > 0 && <span className="text-gray-500 dark:text-gray-400 font-normal text-sm ml-2">({filteredClubs.length})</span>}
        </h2>
        
        {filteredClubs.length === 0 ? (
          <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">No clubs found matching your criteria</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredClubs.map(club => (
              <div 
                key={club.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedClub(club.id)}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/4 h-32 sm:h-auto">
                    <img 
                      src={club.image} 
                      alt={club.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="sm:w-3/4 p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{club.name}</h3>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
                        {club.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm my-2">
                      {club.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {club.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {club.memberCount} members
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 text-sm flex items-center">
                        View details
                        <ArrowRight size={14} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Club Details Modal */}
      {selectedClub && clubDetails && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={clubDetails.image} 
                alt={clubDetails.name} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedClub(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{clubDetails.name}</h2>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded">
                  {clubDetails.category}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {clubDetails.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <Calendar size={18} className="mr-2 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Meeting Times</h4>
                    <p className="text-gray-600 dark:text-gray-300">{clubDetails.meetings}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={18} className="mr-2 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Location</h4>
                    <p className="text-gray-600 dark:text-gray-300">{clubDetails.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users size={18} className="mr-2 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Membership</h4>
                    <p className="text-gray-600 dark:text-gray-300">{clubDetails.memberCount} members</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ExternalLink size={18} className="mr-2 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Website</h4>
                    <a 
                      href={`http://${clubDetails.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {clubDetails.website}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {clubDetails.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => setSelectedClub(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Join Club
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubs;