// src/components/feed/FeedList.jsx
import React from 'react';
import { LoadingSpinner } from '../shared';
import { useFeed } from './hooks/useFeed';
import { FeedHeader, PostList } from './components';
import CreatePost from './CreatePost';

/**
 * Main feed container component
 * Manages post list, creation form, and loading states
 * @returns {JSX.Element} Loading spinner or feed content
 */
const FeedList = () => {
  const { posts, loading, isCreating, setIsCreating, fetchPosts } = useFeed();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-column-bg rounded-xl border border-[#7c3bed33] p-4 h-full">
        <FeedHeader onCreateClick={() => setIsCreating(true)} />

        {/* Conditional render of post creation form */}
        {isCreating && (
          <CreatePost
            onClose={() => setIsCreating(false)}
            onPostCreated={fetchPosts}
          />
        )}

        <PostList posts={posts} onUpdate={fetchPosts} isCreating={isCreating} />
      </div>
    </div>
  );
};

export default FeedList;