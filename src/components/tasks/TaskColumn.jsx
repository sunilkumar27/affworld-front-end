// src/components/tasks/TaskColumn.jsx
import React, { useState } from 'react';
import { AddTaskForm, ColumnHeader, TaskDroppableArea } from './components';

/**
 * TaskColumn renders a column of tasks with optional task creation 
 * Supports adding tasks only in the 'pending' column
 * @param {Object} props - Component properties
 * @param {string} props.columnId - Unique identifier for the column
 * @param {string} props.title - Display title of the column
 * @param {Array} props.tasks - List of tasks in this column
 * @param {function} props.onDeleteTask - Handler for task deletion
 * @param {function} props.onCreateTask - Handler for task creation
 */
const TaskColumn = ({ columnId, title, tasks, onDeleteTask, onCreateTask }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  return (
    <div className="bg-column-bg rounded-xl border border-[#7c3bed33] p-4">
      <ColumnHeader
        title={title}
        showAddButton={columnId === 'pending'}
        onAddClick={() => setIsAddingTask(true)}
      />

      {isAddingTask && (
        <AddTaskForm
          columnId={columnId}
          onClose={() => setIsAddingTask(false)}
          onCreate={onCreateTask}
        />
      )}

      <TaskDroppableArea
        columnId={columnId}
        tasks={tasks}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
};

export default TaskColumn;