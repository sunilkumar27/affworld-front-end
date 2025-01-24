// src/components/tasks/hooks/useTaskBoard.js
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import services from '../../../services/api';
import { groupTasksByStatus, isSamePosition, reorderTasks } from '../utils/taskUtils';

/**
 * Custom hook for managing task board state and drag-drop functionality
 * @returns {Object} Hook return object
 * @returns {Object} taskGroups - Tasks grouped by status (pending/completed/done)
 * @returns {boolean} loading - Loading state indicator
 * @returns {Function} fetchTasks - Fetch and update tasks
 * @returns {Function} handleDragEnd - Handle task drag and drop completion
 */
export const useTaskBoard = () => {
  const [taskGroups, setTaskGroups] = useState({
    pending: [],
    completed: [],
    done: []
  });
  const [loading, setLoading] = useState(true);

  /**
   * Fetches tasks from API and updates state
   * @throws {Error} On API request failure
   */
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await services.tasks.getAll();
      setTaskGroups(groupTasksByStatus(data));
    } catch (error) {
      toast.error('Failed to fetch tasks');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles task drag and drop completion
   * @param {Object} result - Drop result with source and destination
   */
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || isSamePosition(source, destination)) return;

    try {
      const newTaskGroups = reorderTasks(taskGroups, source, destination, draggableId);
      setTaskGroups(newTaskGroups);
      await services.tasks.updateStatus(draggableId, destination.droppableId);
      toast.success('Task updated');
    } catch (error) {
      toast.error('Failed to update task');
      fetchTasks(); // Revert on error
    }
  };

  // Initial task fetch
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    taskGroups,
    loading,
    fetchTasks,
    handleDragEnd
  };
};