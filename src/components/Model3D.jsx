import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// Import components
import LoadingScreen from './common/LoadingScreen';
import LimitedControls from './common/LimitedControls';
import HoverInfo from './common/HoverInfo';
import Model from './model/Model';
import LightingControls from './lighting/LightingControls';
import LightingSetup from './lighting/LightingSetup';

// Import hooks
import { useLoadingState } from './hooks/useLoadingState';
import { useKeyboardPreventDefault } from './hooks/useKeyboardPreventDefault';

// Import constants
import { CAMERA_SETTINGS } from './utils/positionHelpers';

/**
 * קומפוננט המודל התלת-ממדי הראשי
 */
const Model3D = () => {
  const [hovered, setHovered] = useState(null);
  
  // שימוש ב-hooks מותאמים אישית
  const { isLoading, modelLoaded, loadingProgress, setModelLoaded, setLoadingProgress } = useLoadingState();
  useKeyboardPreventDefault();
  
  // הגדרות תאורה
  const lightSettings = LightingControls();

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
    </div>
  );
};

export default Model3D;
