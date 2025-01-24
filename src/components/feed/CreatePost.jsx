// src/components/feed/CreatePost.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAsync } from '../../hooks/useAsync';
import services from '../../services/api';
import { FormHeader, Textarea, FormActions } from '../shared';
import { ImageUploadField } from './components';

/**
 * Create post form component with image upload
 * @param {Object} props
 * @param {Function} props.onClose - Handler to close form
 * @param {Function} props.onPostCreated - Callback after successful post creation
 */
const CreatePost = ({ onClose, onPostCreated }) => {
  // Form state with image preview
  const [formData, setFormData] = useState({
    caption: '',
    image: null,
    preview: ''
  });

  /**
   * Handles image file selection and preview
   * @param {Event} e - File input change event
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  // Post creation API handler
  const createPostFn = async (data) => {
    return services.posts.create(data);
  };

  const { loading, execute: createPost } = useAsync(createPostFn);

  /**
   * Form submission handler
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('image', formData.image);
    formDataToSend.append('caption', formData.caption);

    const result = await createPost(formDataToSend);
    if (result.success) {
      onPostCreated();
      onClose();
      toast.success('Post created successfully');
    }
  };

  return (
    <div className="mb-4 bg-column-bg border border-card-border rounded-lg p-4">
      <FormHeader title="Create New Post" onClose={onClose} />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <ImageUploadField
          preview={formData.preview}
          onChange={handleImageChange}
          onClear={() => setFormData(prev => ({ ...prev, image: null, preview: '' }))}
        />

        <Textarea
          label="Caption"
          value={formData.caption}
          onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
          required
          rows={3}
          placeholder="Write a caption..."
        />

        <FormActions
          onCancel={onClose}
          loading={loading}
          submitText="Create Post"
        />
      </form>
    </div>
  );
};

export default CreatePost;