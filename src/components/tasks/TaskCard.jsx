// src/components/tasks/TaskCard.jsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import services from '../../services/api';
import { toast } from 'react-toastify';

/**
 * Renders an SVG icon based on the task's status
 * @param {string} status - The current status of the task
 * @returns {JSX.Element} SVG icon representing the task status
 */
const getStatusIcon = (status) => {
  // Common styling for status icons
  const commonClasses = "w-6 h-6 text-primary";

  // Render different icons based on task status
  switch (status) {
    case 'pending':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'completed':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'done':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      );
    default:
      return null; // Return null for unrecognized statuses
  }
};

/**
 * Renders a draggable task card with detailed information and actions
 * @param {Object} props - Component props
 * @param {Object} props.task - Task object containing task details
 * @param {number} props.index - Index of the task for drag and drop
 * @param {Function} props.onUpdate - Callback function to trigger task list update
 * @param {Function} props.onDelete - Callback function to handle task deletion
 */
const TaskCard = ({ task, index, onUpdate, onDelete }) => {
  /**
   * Handles task deletion 
   * Uses API service to remove the task and provides user feedback via toast
   */
  const handleDelete = async () => {
    try {
      // Call API to delete the task
      await services.tasks.delete(task._id);
      
      // Trigger parent component's update method
      onUpdate();
      
      // Show success notification
      toast.success('Task deleted successfully');
    } catch (error) {
      // Log and notify about deletion failure
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        // Draggable container with dynamic styling based on drag state
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group relative overflow-hidden rounded-xl border border-card-border bg-card-bg backdrop-blur-xl transition-all p-6 mb-3 ${
            snapshot.isDragging ? 'shadow-lg ring-2 ring-primary' : ''
          }`}
        >
          <div className="relative z-10">
            <div className="space-y-4">
              {/* Status icon container */}
              <div className="w-12 h-12 rounded-lg bg-card-border/50 flex items-center justify-center">
                {getStatusIcon(task.status)}
              </div>

              {/* Task header with title and delete button */}
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-text-primary">{task.title}</h3>
                <button
                  onClick={() => onDelete(task)}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Task description */}
              <p className="text-text-secondary">{task.description}</p>

              {/* Task creation timestamp */}
              <div className="text-sm text-text-secondary">
                Created: {new Date(task.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;