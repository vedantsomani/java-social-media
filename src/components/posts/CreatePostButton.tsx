import React, { useState } from 'react';
import { Image, X, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CreatePostButton: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setIsModalOpen(false);
      setImagePreview(null);
      setCaption('');
      setLocation('');
      // In a real app, you would upload the image and data to your backend here
    }, 1500);
  };
  
  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <img 
          src={user?.avatar || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"} 
          alt="Profile" 
          className="w-10 h-10 rounded-full object-cover mr-4"
        />
        <span className="text-gray-500 dark:text-gray-400">
          What's on your mind?
        </span>
      </button>
      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold">Create Post</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <img 
                    src={user?.avatar || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium">{user?.username || 'Username'}</p>
                    {location && (
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <MapPin size={12} className="mr-1" />
                        <span>{location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <textarea
                  placeholder="What's on your mind?"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-3 text-gray-700 dark:text-gray-200 bg-transparent border-none focus:outline-none resize-none mb-3"
                  rows={3}
                />
                
                {imagePreview ? (
                  <div className="relative mb-4">
                    <img 
                      src={imagePreview} 
                      alt="Post preview" 
                      className="w-full h-auto rounded-lg"
                    />
                    <button 
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white p-1 rounded-full"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 mb-4">
                    <div className="mb-3 text-gray-400">
                      <Image size={40} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Add photos to your post
                    </p>
                    <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
                      <span>Upload Photos</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                )}
                
                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Add location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                  />
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right">
                <button 
                  type="submit"
                  disabled={(!imagePreview && !caption.trim()) || isUploading}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                    (!imagePreview && !caption.trim()) || isUploading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isUploading ? 'Posting...' : 'Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePostButton;