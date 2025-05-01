import React, { useState } from 'react';
import { X, Upload, Image } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface CreateStoryModalProps {
  onClose: () => void;
}

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
      onClose();
      // In a real app, you would upload the image to your backend here
    }, 1500);
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold">Create Story</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            {imagePreview ? (
              <div className="relative aspect-[9/16] w-full mb-4">
                <img 
                  src={imagePreview} 
                  alt="Story preview" 
                  className="w-full h-full object-cover rounded-lg"
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
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 mb-4">
                <div className="mb-3 text-gray-400">
                  <Image size={48} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Drag and drop a photo, or click to browse
                </p>
                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
                  <Upload size={16} className="mr-2" />
                  <span>Choose Photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            )}
            
            {imagePreview && (
              <div className="flex items-center mb-4">
                <img 
                  src={user?.avatar || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-medium">{user?.username || 'Username'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Visible to: Everyone</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!imagePreview || isUploading}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                !imagePreview || isUploading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Share to Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStoryModal;