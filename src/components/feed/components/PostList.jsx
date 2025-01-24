// src/components/feed/components/PostList.jsx
import React from 'react';
import PostCard from '../PostCard';

/**
 * Renders a scrollable list of posts or empty state message
 * @param {Object} props
 * @param {Array} props.posts - Array of post objects to display
 * @param {Function} props.onUpdate - Handler for post updates
 * @param {boolean} props.isCreating - Flag indicating if a new post is being created
 */
export const PostList = ({ posts, onUpdate, isCreating }) => (
  <div className="space-y-4 h-full overflow-y-auto">
    {!isCreating && posts.length === 0 ? (
     <div className="flex justify-center items-center h-full">
       <p className="text-white/50 text-lg font-bold">No Posts Available</p>
     </div>
   ) : (
     posts.map((post) => (
       <PostCard key={post._id} post={post} onUpdate={onUpdate} />
     ))
   )}
  </div>
);