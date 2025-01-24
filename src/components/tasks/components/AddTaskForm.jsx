// src/components/tasks/components/AddTaskForm.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import services from '../../../services/api';
import { FormInput, Textarea, Button } from '../../shared';

/**
 * AddTaskForm component for creating new tasks
 * @param {string} columnId - ID of column where task will be added
 * @param {Function} onClose - Close form handler
 * @param {Function} onCreate - Task creation success handler
 * @returns {JSX.Element} Task creation form
 */
export const AddTaskForm = ({ columnId, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await services.tasks.create({ 
        ...formData, 
        status: columnId 
      });
      onCreate();
      onClose();
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  return (
    <div className="mb-4 bg-card-bg border border-card-border rounded-lg p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          type="text"
          label="Task Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={3}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
};