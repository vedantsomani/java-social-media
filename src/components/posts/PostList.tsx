import React from 'react';
import Post, { PostType } from './Post';
import CreatePostButton from './CreatePostButton';

// Mock data for posts
const mockPosts: PostType[] = [
  {
    id: '1',
    user: {
      id: '101',
      username: 'sarah_j',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    },
    caption: 'Excited for the new semester! 📚 #CollegeLife',
    imageUrl: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    likesCount: 128,
    commentsCount: 8,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    comments: [
      {
        id: 'c1',
        user: {
          id: '102',
          username: 'mike_r',
        },
        text: 'Good luck this semester!',
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: 'c2',
        user: {
          id: '103',
          username: 'emma_k',
        },
        text: 'The library looks so peaceful early in the morning!',
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      },
    ],
    location: 'University Library',
  },
  {
    id: '2',
    user: {
      id: '102',
      username: 'mike_r',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    },
    caption: 'Our team won the intramural championship! 🏆 #Champions #CollegeSports',
    imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
    likesCount: 256,
    commentsCount: 12,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    comments: [
      {
        id: 'c3',
        user: {
          id: '101',
          username: 'sarah_j',
        },
        text: 'Congratulations! 👏',
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      },
      {
        id: 'c4',
        user: {
          id: '104',
          username: 'alex_t',
        },
        text: 'You guys crushed it!',
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
      },
    ],
    location: 'Campus Stadium',
  },
  {
    id: '3',
    user: {
      id: '103',
      username: 'emma_k',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
    },
    caption: 'Study group session before finals. We got this! ✏️ #StudyBuddies #Finals',
    imageUrl: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
    likesCount: 98,
    commentsCount: 6,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    comments: [
      {
        id: 'c5',
        user: {
          id: '105',
          username: 'jason_l',
        },
        text: 'Need any help with calculus?',
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
      {
        id: 'c6',
        user: {
          id: '106',
          username: 'lisa_w',
        },
        text: 'Your study group looks so productive!',
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
    ],
    location: 'Student Union',
  },
];

const PostList: React.FC = () => {
  return (
    <div className="space-y-6">
      <CreatePostButton />
      
      {mockPosts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;