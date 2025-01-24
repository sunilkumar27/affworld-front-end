// src/components/tasks/utils/taskUtils.js
/**
 * Groups tasks by their status
 * @param {Array} tasks - List of tasks
 * @returns {Object} Grouped tasks
 */
export const groupTasksByStatus = (tasks) => {     
    const grouped = {
      pending: [],
      completed: [],
      done: []
    };
    
    tasks.forEach(task => {
      const status = task.status || 'pending';
      if (grouped[status]) {
        grouped[status].push(task);
      }
    });
  
    return grouped;
  };
  
  /**
   * Checks if drag destination is same as source
   * @param {Object} source - Source position
   * @param {Object} destination - Destination position
   * @returns {boolean}
   */
  export const isSamePosition = (source, destination) => {
    return destination.droppableId === source.droppableId && 
           destination.index === source.index;
  };
  
  /**
   * Reorders tasks after drag and drop
   * @param {Object} taskGroups - Current task groups
   * @param {Object} source - Source position
   * @param {Object} destination - Destination position
   * @param {string} taskId - Task ID
   * @returns {Object} Updated task groups
   */
  export const reorderTasks = (taskGroups, source, destination, taskId) => {
    const sourceList = Array.from(taskGroups[source.droppableId]);
    const destList = source.droppableId === destination.droppableId
      ? sourceList
      : Array.from(taskGroups[destination.droppableId]);
  
    const taskIndex = sourceList.findIndex(t => t._id === taskId);
    const [movedTask] = sourceList.splice(taskIndex, 1);
  
    destList.splice(destination.index, 0, {
      ...movedTask,
      status: destination.droppableId
    });
  
    return {
      ...taskGroups,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList
    };
  };