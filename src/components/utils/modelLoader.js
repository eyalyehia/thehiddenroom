import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { handleKeyboardColoring } from './sceneHelpers';

/**
 * פונקציה לטעינת מודל GLTF עם אופטימיזציות ביצועים
 * @param {string} modelUrl - URL של המודל
 * @param {Function} onLoad - פונקציה שתרוץ כשהמודל נטען
 * @param {Function} onProgress - פונקציה שתרוץ במהלך הטעינה
 * @param {Function} onError - פונקציה שתרוץ במקרה של שגיאה
 */
export const loadGLTFModel = (modelUrl, onLoad, onProgress, onError) => {
  const loader = new GLTFLoader();
  
  // הגדרת DRACO loader לדחיסה מתקדמת
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  dracoLoader.setDecoderConfig({ type: 'js' });
  dracoLoader.preload();
  loader.setDRACOLoader(dracoLoader);

  // הגדרת KTX2 loader לטקסטורות מדחוסות
  const ktx2Loader = new KTX2Loader();
  ktx2Loader.setTranscoderPath('https://unpkg.com/three@0.150.1/examples/js/libs/basis/');
  loader.setKTX2Loader(ktx2Loader);

  // הגדרת Meshopt decoder לאופטימיזציה
  loader.setMeshoptDecoder(MeshoptDecoder);
  
  loader.load(
    modelUrl,
    // onLoad
    (gltf) => {
      // console.log("GLTF נטען בהצלחה:", gltf);
      
      // מציאת המקלדת וצביעה בשחור
      gltf.scene.traverse((object) => {
        handleKeyboardColoring(object);
      });
      
      onLoad(gltf);
    },
    // onProgress - עם שיפורי מהירות בדיווח
    (progress) => {
      if (progress.lengthComputable) {
        const percent = (progress.loaded / progress.total * 100);
        // console.log(`טעינה: ${percent.toFixed(2)}%`);
        // דלג על עדכונים קטנים לביצועים טובים יותר
        if (percent - (onProgress.lastReported || 0) > 2) {
          onProgress(Math.min(98, percent));
          onProgress.lastReported = percent;
        }
      } else {
        // טעינה מהירה יותר כשאין מידע על גודל הקובץ
        onProgress(prev => Math.min(95, prev + 3));
      }
    },
    // onError
    (error) => {
      // console.error("שגיאה בטעינת GLTF:", error);
      onError(error);
    }
  );
}; 