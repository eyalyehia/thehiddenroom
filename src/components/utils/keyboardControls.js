import { INITIAL_ROTATION } from './positionHelpers';

/**
 * פונקציה ליצירת מטפל אירועי מקלדת
 * @param {Object} rotationState - מצב הסיבוב
 * @param {Object} modelRef - רפרנס למודל
 * @returns {Object} מטפלי האירועים
 */
export const createKeyboardHandlers = (rotationState, modelRef) => {
  const handleKeyDown = (event) => {
    switch(event.key) {
      case 'ArrowLeft':
        rotationState.current.arrowLeft = true;
        event.preventDefault();
        break;
      case 'ArrowRight':
        rotationState.current.arrowRight = true;
        event.preventDefault();
        break;
      case 'ArrowUp':
        rotationState.current.arrowUp = true;
        event.preventDefault();
        break;
      case 'ArrowDown':
        rotationState.current.arrowDown = true;
        event.preventDefault();
        break;
      case ' ':
        if (modelRef.current) {
          modelRef.current.rotation.set(
            INITIAL_ROTATION[0],
            INITIAL_ROTATION[1],
            INITIAL_ROTATION[2]
          );
        }
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch(event.key) {
      case 'ArrowLeft':
        rotationState.current.arrowLeft = false;
        break;
      case 'ArrowRight':
        rotationState.current.arrowRight = false;
        break;
      case 'ArrowUp':
        rotationState.current.arrowUp = false;
        break;
      case 'ArrowDown':
        rotationState.current.arrowDown = false;
        break;
      default:
        break;
    }
  };

  return { handleKeyDown, handleKeyUp };
};

/**
 * פונקציה למניעת גלילה ברירת מחדל
 * @returns {Function} מטפל האירוע
 */
export const createPreventDefaultHandler = () => {
  return (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.code)) {
      e.preventDefault();
    }
  };
}; 