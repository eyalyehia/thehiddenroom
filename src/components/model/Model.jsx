import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Import utilities
import { getModelUrl } from '../utils/firebaseHelpers';
import { loadGLTFModel } from '../utils/modelLoader';
import { createKeyboardHandlers } from '../utils/keyboardControls';
import { handleModelRotation } from '../utils/rotationHelpers';
import { handlePointerOver, handlePointerOut, handleClick } from '../utils/interactionHelpers';
import { INTERACTIVE_OBJECTS } from '../constant';
import { INITIAL_ROTATION, MODEL_SCALE, MODEL_POSITION } from '../utils/positionHelpers';
import { handleKeyboardInScene, improveMaterialAppearance, getInteractiveObjectInfo } from '../utils/sceneHelpers';

/**
 * קומפוננט המודל הראשי
 * @param {Function} setHovered - פונקציה לעדכון מצב ההובר
 * @param {Function} setModelLoaded - פונקציה לעדכון מצב טעינת המודל
 * @param {Function} setLoadingProgress - פונקציה לעדכון התקדמות הטעינה
 */
const Model = ({ setHovered, setModelLoaded, setLoadingProgress }) => {
  const [modelUrl, setModelUrl] = useState(null);
  const [gltfScene, setGltfScene] = useState(null);
  const interactiveObjects = useRef({});
  const modelRef = useRef();
  const rotationState = useRef({
    arrowLeft: false,
    arrowRight: false,
    arrowUp: false,
    arrowDown: false
  });

  // טעינת URL המודל מ-Firebase
  useEffect(() => {
    const loadModelUrl = async () => {
      try {
        const url = await getModelUrl();
        setModelUrl(url);
      } catch (_err) {
        // console.error("שגיאה בטעינת URL המודל:", _err);
        if (setModelLoaded) setModelLoaded(false);
      }
    };
    loadModelUrl();
  }, [setModelLoaded]);

  // טעינת המודל GLTF
  useEffect(() => {
    if (!modelUrl) return;

    const handleLoad = (gltf) => {
      setGltfScene(gltf.scene);
      if (setLoadingProgress) setLoadingProgress(100);
      if (setModelLoaded) setModelLoaded(true);
    };

    const handleProgress = (percent) => {
      if (setLoadingProgress) setLoadingProgress(percent);
    };

    const handleError = (_err) => {
      // console.error("שגיאה בטעינת המודל:", _err);
      if (setModelLoaded) setModelLoaded(false);
    };

    loadGLTFModel(modelUrl, handleLoad, handleProgress, handleError);
  }, [modelUrl, setLoadingProgress, setModelLoaded]);

  // הגדרת בקרות מקלדת
  useEffect(() => {
    const { handleKeyDown, handleKeyUp } = createKeyboardHandlers(rotationState, modelRef);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // סיבוב המודל בהתאם למקשים הלחוצים
  useFrame(() => {
    handleModelRotation(modelRef, rotationState);
  });

  // עיבוד הסצנה וזיהוי אובייקטים אינטראקטיביים עם אופטימיזציות ביצועים
  useEffect(() => {
    if (!gltfScene) return;
    
    interactiveObjects.current = {};

    gltfScene.traverse((object) => {
      if (object.isMesh) {
        // לוג זמני לזיהוי הטובלרון
        if (object.name && (object.name.toLowerCase().includes("toblerone") || 
                           object.name.toLowerCase().includes("cube") ||
                           object.name.toLowerCase().includes("טובלרון"))) {
          console.log(`מצאתי אובייקט שעשוי להיות טובלרון: "${object.name}"`);
        }
        
        // אופטימיזציות ביצועים
        object.castShadow = false;
        object.receiveShadow = false;
        object.frustumCulled = true;

        // טיפול מיוחד במקלדת - צביעה בשחור
        handleKeyboardInScene(object);

        // שיפור מראה החומרים
        improveMaterialAppearance(object);

        // בדיקה מיוחדת לטובלרון
        const isToblerone = object.name === "Cube" && 
                           !object.name.toLowerCase().includes("wall") && 
                           !object.name.toLowerCase().includes("window") && 
                           !object.name.toLowerCase().includes("frame") &&
                           object.position && 
                           object.position.y > -2 && object.position.y < 2; // בדיקת גובה סביר לטובלרון על השולחן
        
        const isInteractive = isToblerone || INTERACTIVE_OBJECTS.some(name => 
          object.name === name || 
          object.name.includes(name) ||
          (object.parent && object.parent.name.includes(name))
        );
        
        // לוג מיוחד לספר עם משקפיים
        if (object.name && (object.name.toLowerCase().includes("book") || object.name.toLowerCase().includes("glasses"))) {
          // console.log(`נמצא אובייקט שעשוי להיות ספר: "${object.name}", isInteractive: ${isInteractive}`);
        }

        if (isInteractive) {
          let key, description;
          
          // אם זה הטובלרון, הגדר אותו ישירות
          if (isToblerone) {
            key = "Toblerone";
            description = "טובלרון";
          } else {
            const result = getInteractiveObjectInfo(object);
            key = result.key;
            description = result.description;
          }
          
          // console.log(`אובייקט אינטראקטיבי נמצא: "${object.name}" -> ${key} (${description})`);

          object.userData.name = key;
          object.userData.description = description;
          object.userData.isInteractive = true;
          interactiveObjects.current[key] = object;
        } else {
          object.userData.isInteractive = false;
        }
      }
    });
  }, [gltfScene]);

  // מטפלי אירועי עכבר
  const onPointerOver = (e) => handlePointerOver(e, setHovered, interactiveObjects);
  const onPointerOut = (e) => handlePointerOut(e, setHovered, interactiveObjects);
  const onClick = (e) => handleClick(e);

  if (!gltfScene) {
    return null;
  }

  return (
    <primitive
      ref={modelRef}
      object={gltfScene}
      scale={MODEL_SCALE}
      position={MODEL_POSITION}
      rotation={INITIAL_ROTATION}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    />
  );
};

export default Model; 