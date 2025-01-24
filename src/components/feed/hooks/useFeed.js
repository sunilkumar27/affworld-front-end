// src/components/feed/hooks/useFeed.js
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import services from '../../../services/api';

/**
 * Custom hook for managing feed state and operations
 * @returns {Object} Feed state and operations
 * @property {Array} posts - List of posts
 * @property {boolean} loading - Loading state
 * @property {boolean} isCreating - New post creation state
 * @property {Function} setIsCreating - Update creation state
 * @property {Function} fetchPosts - Fetch posts from API
 */
export const useFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  /**
   * Fetches posts from the API
   * @throws {Error} When API request fails
   */
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await services.posts.getAll();
      setPosts(data);
    } catch (error) {
      toast.error('Failed to fetch posts');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Initial posts fetch
  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    isCreating,
    setIsCreating,
    fetchPosts
  };
};