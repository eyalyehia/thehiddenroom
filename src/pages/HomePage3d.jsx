import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// Import components
import LoadingScreen from '../components/common/LoadingScreen';
import LimitedControls from '../components/common/LimitedControls';
import HoverInfo from '../components/common/HoverInfo';
import Song from '../components/common/Song';
import Model from '../components/model/Model';
import LightingControls from '../components/lighting/LightingControls';
import LightingSetup from '../components/lighting/LightingSetup';

// Import hooks
import { useLoadingState } from '../components/hooks/useLoadingState';
import { useKeyboardPreventDefault } from '../components/hooks/useKeyboardPreventDefault';

// Import constants
import { CAMERA_SETTINGS } from '../components/utils/positionHelpers';

/**
 * קומפוננט העמוד הראשי של המודל התלת-ממדי
 */
const HomePage3d = () => {
  const [hovered, setHovered] = useState(null);
  
  // שימוש ב-hooks מותאמים אישית
  const { isLoading, loadingProgress, setModelLoaded, setLoadingProgress } = useLoadingState();
  useKeyboardPreventDefault();
  
  // הגדרות תאורה
  // const lightSettings = LightingControls(); // הוסתר זמנית - להחזיר בחזרה הסר את // מתחילת השורה
  
  // הגדרות תאורה קבועות (במקום Leva)
  const lightSettings = {
    'עוצמה כללית': 0.3,
    'צבע תאורה כללית': '#8b7a5c',
    'עוצמת מנורה': 6.5,
    'צבע מנורה': '#f7dc6f',
    'זווית מנורה': Math.PI / 3.5,
    'רכות קצוות': 0.3,
    'עוצמת מסך': 6.8,
    'צבע מסך': '#e74c3c',
    'עוצמת מחשב צדדי': 5.8,
    'צבע מחשב צדדי': '#ff6b6b',
    'עוצמת פוסטר שמאל': 14.5,
    'צבע פוסטר שמאל': '#ff8000',
    'עוצמת פוסטר ימין': 4.5,
    'צבע פוסטר ימין': '#42a5f5',
    'עוצמת מקלדת': 4.8,
    'צבע מקלדת': '#ffa502',
    'עוצמת ג\'ויסטיק': 3.5,
    'צבע ג\'ויסטיק': '#ffb347',
    'איכות פיזית': true,
    'סביבת לילה': true,
  };

  return (
    <div id="model-container" style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      {isLoading && <LoadingScreen progress={loadingProgress} />}

      <Canvas
        style={{ background: '#1a1611' }}
        camera={{ position: CAMERA_SETTINGS.position, fov: CAMERA_SETTINGS.fov }}
        onCreated={({ gl }) => {
          gl.physicallyCorrectLights = lightSettings['איכות פיזית'];
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.shadowMap.enabled = false;
          gl.toneMapping = THREE.ReinhardToneMapping;
          gl.toneMappingExposure = 1.1;
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
        performance={{ min: 0.5 }}
      >
        {/* הגדרת כל התאורה */}
        <LightingSetup lightSettings={lightSettings} />

        {/* סביבת הלילה */}
        <Environment preset="night" />

        {/* המודל התלת-ממדי */}
        <Suspense fallback={null}>
          <Model 
            setHovered={setHovered} 
            setModelLoaded={setModelLoaded}
            setLoadingProgress={setLoadingProgress}
          />
        </Suspense>

        {/* בקרות המצלמה */}
        <LimitedControls />
      </Canvas>

      {/* מידע על האובייקט המוצג */}
      <HoverInfo hovered={hovered} />
      
      {/* כפתור השמע */}
      <Song isPageLoading={isLoading} />
    </div>
  );
};

export default HomePage3d; 