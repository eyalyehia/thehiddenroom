import { useState, useEffect } from 'react';

/**
 * Hook לניהול מצב הטעינה
 * @returns {Object} מצב הטעינה ופונקציות לעדכון
 */
export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // עדכון מצב הטעינה כאשר המודל נטען
  useEffect(() => {
    if (modelLoaded && loadingProgress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [modelLoaded, loadingProgress]);

  return {
    isLoading,
    modelLoaded,
    loadingProgress,
    setModelLoaded,
    setLoadingProgress
  };
}; 