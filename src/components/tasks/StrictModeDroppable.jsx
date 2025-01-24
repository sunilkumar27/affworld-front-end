// src/components/tasks/StrictModeDroppable.jsx
import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

/**
 * React StrictMode compatible wrapper for react-beautiful-dnd Droppable
 * @param {Function} children - Render props function
 * @param {Object} props - Droppable props
 * @returns {JSX.Element|null} Droppable component or null during animation frame
 */
const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setEnabled(true);
    });

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) return null;

  return (
    <Droppable {...props}>
      {(provided, snapshot) => children(provided, snapshot)}
    </Droppable>
  );
};

export default StrictModeDroppable;