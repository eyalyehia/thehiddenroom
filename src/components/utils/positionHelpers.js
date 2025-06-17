// Initial rotation values for resetting the model
export const INITIAL_ROTATION = [
  -0.4 * (Math.PI / 180),
  -44.7 * (Math.PI / 180),
  -0.1 * (Math.PI / 180)
];

// Model positioning constants
export const MODEL_SCALE = 5.4;
export const MODEL_POSITION = [-1.8, -0.1, 1.3];

// Camera settings
export const CAMERA_SETTINGS = {
  position: [3, 3, 14],
  fov: 45
};

// Rotation limits
export const ROTATION_LIMITS = {
  speed: 0.02,
  minAzimuthAngle: -Math.PI / 12,
  maxAzimuthAngle: Math.PI / 12,
  minPolarAngle: Math.PI / 30,
  maxPolarAngle: Math.PI / 4,
  fixedYRotationBase: -44.7 * (Math.PI / 180),
  fixedXRotationBase: -0.4 * (Math.PI / 180)
}; 