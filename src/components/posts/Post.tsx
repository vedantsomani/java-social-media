import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from '../../utils/dateUtils';

export interface PostType {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  caption: string;
  imageUrl: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  comments: {
    id: string;
    user: {
      id: string;
      username: string;
    };
    text: string;
    createdAt: string;
  }[];
  location?: string;
}

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [comment, setComment] = useState('');
  
  const handleLike = () => {
    setLiked(!liked);
  };
  
  const handleSave = () => {
    setSaved(!saved);
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // In a real app, you would submit the comment to the backend
      console.log('Submitting comment:', comment);
      setComment('');
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
        <div className="flex items-center">
          <Link to={`/profile/${post.user.username}`} className="mr-3">
            <img 
              src={post.user.avatar} 
              alt={post.user.username} 
              className="w-8 h-8 rounded-full object-cover"
            />
          </Link>
          <div>
            <Link to={`/profile/${post.user.username}`} className="font-semibold text-sm hover:underline">
              {post.user.username}
            </Link>
            {post.location && (
              <p className="text-xs text-gray-500 dark:text-gray-400">{post.location}</p>
            )}
          </div>
        </div>
        <button className="text-gray-500 dark:text-gray-400">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      {/* Post Image */}
      <div className="relative pb-[100%]">
        <img 
          src={post.imageUrl} 
          alt="Post" 
          className="absolute h-full w-full object-cover"
        />
      </div>
      
      {/* Post Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className={`${liked ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}
            >
              <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <button className="text-gray-700 dark:text-gray-300">
              <MessageCircle size={24} />
            </button>
            <button className="text-gray-700 dark:text-gray-300">
              <Send size={24} />
            </button>
          </div>
          <button 
            onClick={handleSave}
            className={`${saved ? 'text-yellow-500' : 'text-gray-700 dark:text-gray-300'}`}
          >
            <Bookmark size={24} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        {/* Likes Count */}
        <p className="font-semibold text-sm mb-1">
          {liked ? post.likesCount + 1 : post.likesCount} likes
        </p>
        
        {/* Caption */}
        <p className="text-sm mb-1">
          <Link to={`/profile/${post.user.username}`} className="font-semibold mr-1">
            {post.user.username}
          </Link>
          {post.caption}
        </p>
        
        {/* Comments */}
        {post.commentsCount > 0 && !showAllComments && (
          <button 
            onClick={() => setShowAllComments(true)}
            className="text-sm text-gray-500 dark:text-gray-400 mb-1"
          >
            View all {post.commentsCount} comments
          </button>
        )}
        
        {(showAllComments ? post.comments : post.comments.slice(0, 2)).map(comment => (
          <div key={comment.id} className="text-sm mb-1">
            <Link to={`/profile/${comment.user.username}`} className="font-semibold mr-1">
              {comment.user.username}
            </Link>
            {comment.text}
          </div>
        ))}
        
        {/* Timestamp */}
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mt-2">
          {formatDistanceToNow(new Date(post.createdAt))}
        </p>
      </div>
      
      {/* Comment Form */}
      <form 
        onSubmit={handleSubmitComment}
        className="flex items-center p-3 border-t dark:border-gray-700"
      >
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 bg-transparent text-sm outline-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button 
          type="submit"
          disabled={!comment.trim()}
          className={`text-sm font-semibold ${
            comment.trim() ? 'text-blue-500' : 'text-blue-300 cursor-default'
          }`}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;