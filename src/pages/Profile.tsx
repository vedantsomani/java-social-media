import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Grid, Bookmark, Settings, MapPin, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Post, { PostType } from '../components/posts/Post';

// Mock data for profile
const mockPosts: PostType[] = [
  {
    id: '1',
    user: {
      id: '123',
      username: 'student123',
      avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    },
    caption: 'Studying for finals! ✏️ #StudentLife',
    imageUrl: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
    likesCount: 56,
    commentsCount: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    comments: [
      {
        id: 'c1',
        user: {
          id: '102',
          username: 'friend1',
        },
        text: 'Good luck!',
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
    ],
    location: 'University Library',
  },
  {
    id: '2',
    user: {
      id: '123',
      username: 'student123',
      avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    },
    caption: 'Campus looks beautiful today! 🌳',
    imageUrl: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg',
    likesCount: 43,
    commentsCount: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    comments: [
      {
        id: 'c2',
        user: {
          id: '103',
          username: 'friend2',
        },
        text: 'So pretty!',
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
    ],
  },
];

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const isCurrentUser = user?.username === username;
  
  // For a real app, you would fetch the profile data based on the username
  const profileData = {
    username: username || 'username',
    avatar: user?.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    fullName: isCurrentUser ? user?.fullName : 'College Student',
    bio: 'Computer Science major | Class of 2025 | Tennis team',
    college: isCurrentUser ? user?.college : 'Demo University',
    postsCount: mockPosts.length,
    followersCount: 215,
    followingCount: 186,
    website: 'www.mystudentportfolio.com',
  };
  
  const handleFollow = () => {
    // In a real app, this would trigger a follow/unfollow API call
    console.log('Follow button clicked');
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          {/* Profile Picture */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-8">
            <img 
              src={profileData.avatar} 
              alt={profileData.username}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center mb-4">
              <h1 className="text-xl font-semibold mb-2 sm:mb-0 sm:mr-4">
                {profileData.username}
              </h1>
              
              {isCurrentUser ? (
                <button className="bg-gray-100 dark:bg-gray-700 px-4 py-1.5 rounded-md text-sm font-medium">
                  Edit Profile
                </button>
              ) : (
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium" onClick={handleFollow}>
                  Follow
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 mb-4">
              <div>
                <span className="font-semibold">{profileData.postsCount}</span> posts
              </div>
              <div>
                <span className="font-semibold">{profileData.followersCount}</span> followers
              </div>
              <div>
                <span className="font-semibold">{profileData.followingCount}</span> following
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="font-semibold">{profileData.fullName}</p>
              <p className="text-sm whitespace-pre-wrap">{profileData.bio}</p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1 text-gray-500 dark:text-gray-400" />
                  <span>{profileData.college}</span>
                </div>
                {profileData.website && (
                  <div className="flex items-center">
                    <LinkIcon size={14} className="mr-1 text-gray-500 dark:text-gray-400" />
                    <a href={`https://${profileData.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400">
                      {profileData.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex w-full border-t dark:border-gray-700">
          <TabsTrigger 
            value="posts" 
            className={`flex-1 py-3 flex justify-center items-center ${
              activeTab === 'posts' 
                ? 'border-t-2 border-gray-900 dark:border-white text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Grid size={16} className="mr-2" />
            Posts
          </TabsTrigger>
          <TabsTrigger 
            value="saved" 
            className={`flex-1 py-3 flex justify-center items-center ${
              activeTab === 'saved' 
                ? 'border-t-2 border-gray-900 dark:border-white text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Bookmark size={16} className="mr-2" />
            Saved
          </TabsTrigger>
          {isCurrentUser && (
            <TabsTrigger 
              value="settings" 
              className={`flex-1 py-3 flex justify-center items-center ${
                activeTab === 'settings' 
                  ? 'border-t-2 border-gray-900 dark:border-white text-gray-900 dark:text-white' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Settings size={16} className="mr-2" />
              Settings
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="posts" className="space-y-6">
          {mockPosts.length > 0 ? (
            mockPosts.map(post => (
              <Post key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No posts yet</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {isCurrentUser ? 'You have no saved posts yet' : 'Saved posts are private'}
            </p>
          </div>
        </TabsContent>
        
        {isCurrentUser && (
          <TabsContent value="settings">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    College/University
                  </label>
                  <input
                    type="text"
                    value={user?.college}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700"
                  />
                </div>
                <div className="pt-4">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Profile;