import { ROTATION_LIMITS } from './positionHelpers';

/**
 * פונקציה לטיפול בסיבוב המודל בהתאם למקשים הלחוצים
 * @param {Object} modelRef - רפרנס למודל
 * @param {Object} rotationState - מצב המקשים הלחוצים
 */
export const handleModelRotation = (modelRef, rotationState) => {
  if (!modelRef.current) return;

  const { speed, minAzimuthAngle, maxAzimuthAngle, minPolarAngle, maxPolarAngle, fixedYRotationBase, fixedXRotationBase } = ROTATION_LIMITS;

  // Left arrow - rotates right around Y-axis (clockwise)
  if (rotationState.current.arrowLeft) {
    const nextRotation = modelRef.current.rotation.y + speed;
    const nextRelativeRotation = nextRotation - fixedYRotationBase;
    if (nextRelativeRotation <= maxAzimuthAngle) {
      modelRef.current.rotation.y += speed;
    } else {
      modelRef.current.rotation.y = fixedYRotationBase + maxAzimuthAngle;
    }
  }

  // Right arrow - rotates left around Y-axis (counter-clockwise)
  if (rotationState.current.arrowRight) {
    const nextRotation = modelRef.current.rotation.y - speed;
    const nextRelativeRotation = nextRotation - fixedYRotationBase;
    if (nextRelativeRotation >= minAzimuthAngle) {
      modelRef.current.rotation.y -= speed;
    } else {
      modelRef.current.rotation.y = fixedYRotationBase + minAzimuthAngle;
    }
  }

  // Up arrow - rotates up around X-axis
  if (rotationState.current.arrowUp) {
    const nextRotation = modelRef.current.rotation.x + speed;
    const nextRelativeRotation = nextRotation - fixedXRotationBase;
    if (nextRelativeRotation <= maxPolarAngle) {
      modelRef.current.rotation.x += speed;
    } else {
      modelRef.current.rotation.x = fixedXRotationBase + maxPolarAngle;
    }
  }

  // Down arrow - rotates down around X-axis
  if (rotationState.current.arrowDown) {
    const nextRotation = modelRef.current.rotation.x - speed;
    const nextRelativeRotation = nextRotation - fixedXRotationBase;
    if (nextRelativeRotation >= minPolarAngle) {
      modelRef.current.rotation.x -= speed;
    } else {
      modelRef.current.rotation.x = fixedXRotationBase + minPolarAngle;
    }
  }
}; 