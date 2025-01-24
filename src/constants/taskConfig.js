// src/constants/taskConfig.js
/**
 * Defines task column configurations with titles and associated icons
 * Represents different stages of task progression in the application
 */
export const TASK_COLUMNS = {
  // Tasks waiting to be started or in initial stage
  pending: {
    title: 'Pending',
    icon: 'clock'
  },
  // Tasks that have been completed but may need final verification
  completed: {
    title: 'Completed',
    icon: 'check'
  },
  // Tasks fully finished and ready for archiving
  done: {
    title: 'Done',
    icon: 'archive'
  }
};