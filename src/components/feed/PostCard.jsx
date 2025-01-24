// src/components/feed/PostCard.jsx
import { useState } from 'react';
import { useAuth } from '../../context/auth/AuthContext';
import services from '../../services/api';
import { ConfirmationModal } from '../shared';
import { toast } from 'react-toastify';

/**
 * PostCard component displays individual post with delete functionality
 * @param {Object} props
 * @param {Object} props.post - Post data object
 * @param {Function} props.onUpdate - Callback for post updates
 */
const PostCard = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  /**
   * Handles post deletion with error handling
   */
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await services.posts.delete(post._id);
      onUpdate();
      setShowConfirmDelete(false);
      toast.success('Post deleted successfully');
    } catch (error) {
      setDeleteError(error);
      toast.error('Failed to delete post');
      console.error('Error deleting post:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-card-bg border border-card-border rounded-lg shadow overflow-hidden">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {user.profilePicture && (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-12 h-12"
              />
            )}
            <span className="text-xl font-bold text-text-primary">
              {user.name}
            </span>
          </div>
          {/* Delete button - visible only to post owner */}
          {user && user._id === post.userId._id && (
            <div>
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="Delete post"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Post Image */}
      <img
        src={post.imageUrl}
        alt={post.caption}
        className="w-auto h-auto object-cover"
      />
      {/* Post Content */}
      <div className="p-4">
        <p className="text-text-secondary">{post.caption}</p>
        <p className="text-sm text-text-secondary">
          Created: {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        title="Delete Post?"
        message="This action cannot be undone."
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        onConfirm={handleDelete}
        loading={isDeleting}
      />
    </div>
  );
};

export default PostCard;