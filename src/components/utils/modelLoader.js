import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { handleKeyboardColoring } from './sceneHelpers';

/**
 * פונקציה לטעינת מודל GLTF
 * @param {string} modelUrl - URL של המודל
 * @param {Function} onLoad - פונקציה שתרוץ כשהמודל נטען
 * @param {Function} onProgress - פונקציה שתרוץ במהלך הטעינה
 * @param {Function} onError - פונקציה שתרוץ במקרה של שגיאה
 */
export const loadGLTFModel = (modelUrl, onLoad, onProgress, onError) => {
  const loader = new GLTFLoader();
  
  loader.load(
    modelUrl,
    // onLoad
    (gltf) => {
      console.log("GLTF נטען בהצלחה:", gltf);
      
      // מציאת המקלדת וצביעה בשחור
      gltf.scene.traverse((object) => {
        handleKeyboardColoring(object);
      });
      
      onLoad(gltf);
    },
    // onProgress
    (progress) => {
      if (progress.lengthComputable) {
        const percent = (progress.loaded / progress.total * 100);
        console.log(`טעינה: ${percent.toFixed(2)}%`);
        onProgress(Math.min(98, percent));
      } else {
        onProgress(prev => Math.min(90, prev + 1));
      }
    },
    // onError
    (error) => {
      console.error("שגיאה בטעינת GLTF:", error);
      onError(error);
    }
  );
}; 