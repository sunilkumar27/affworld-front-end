// src/components/tasks/components/TaskDroppableArea.jsx
import React from 'react';
import TaskCard from '../TaskCard';
import StrictModeDroppable from '../StrictModeDroppable';

/**
 * Droppable area component for tasks with drag-and-drop functionality
 * @param {string} columnId - ID for droppable area
 * @param {Array} tasks - List of tasks to render
 * @param {Function} onDeleteTask - Task deletion handler
 * @returns {JSX.Element} Droppable area with task cards
 */
export const TaskDroppableArea = ({ columnId, tasks, onDeleteTask }) => (
  <StrictModeDroppable droppableId={columnId} type="TASK">
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`min-h-[500px] rounded-md transition-colors ${
          snapshot.isDraggingOver ? 'bg-white/5' : ''
        }`}
      >
        {tasks.map((task, index) => (
          <TaskCard
            key={task._id}
            task={task}
            index={index}
            onDelete={onDeleteTask}
          />
        ))}
        {provided.placeholder}
      </div>
    )}
  </StrictModeDroppable>
);