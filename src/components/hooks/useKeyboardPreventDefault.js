import { useEffect } from 'react';
import { createPreventDefaultHandler } from '../utils/keyboardControls';

/**
 * Hook למניעת התנהגות ברירת מחדל של מקשי החצים
 */
export const useKeyboardPreventDefault = () => {
  useEffect(() => {
    const preventDefaultArrows = createPreventDefaultHandler();

    window.addEventListener('keydown', preventDefaultArrows);
    return () => window.removeEventListener('keydown', preventDefaultArrows);
  }, []);
}; 