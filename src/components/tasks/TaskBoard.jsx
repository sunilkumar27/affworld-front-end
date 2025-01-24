// src/components/tasks/TaskBoard.jsx
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { LoadingSpinner, ConfirmationModal } from '../shared';
import { useTaskBoard } from './hooks/useTaskBoard';
import { TASK_COLUMNS } from '../../constants/taskConfig';
import TaskColumn from './TaskColumn';
import services from '../../services/api';

/**
 * Task board component with drag-drop functionality and task management
 * @returns {JSX.Element} Task board with columns and task cards
 */
const TaskBoard = () => {
  const { taskGroups, loading, handleDragEnd, fetchTasks } = useTaskBoard();
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Handles task deletion with error handling
   */
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await services.tasks.delete(taskToDelete._id);
      toast.success('Task deleted successfully');
      fetchTasks();
      setTaskToDelete(null);
    } catch (error) {
      toast.error('Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(TASK_COLUMNS).map(([id, { title }]) => (
            <TaskColumn
              key={id}
              columnId={id}
              title={title}
              tasks={taskGroups[id]}
              onDeleteTask={setTaskToDelete}
              onCreateTask={fetchTasks}
            />
          ))}
        </div>
      </DragDropContext>

      <ConfirmationModal
        open={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        title="Delete Task?"
        message="This action cannot be undone."
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        onConfirm={handleDelete}
        loading={isDeleting}
      />
    </div>
  );
};

export default TaskBoard;