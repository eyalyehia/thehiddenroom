import React, { useRef, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';

function LimitedControls() {
  const controlsRef = useRef();

  useEffect(() => {
    const handleReset = (e) => {
      if (e.key === ' ' && controlsRef.current) {
        controlsRef.current.reset();
      }
    };

    window.addEventListener('keydown', handleReset);
    return () => window.removeEventListener('keydown', handleReset);
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      minDistance={8}
      maxDistance={14}
      minPolarAngle={Math.PI / 2.5}
      maxPolarAngle={Math.PI / 2.2}
      minAzimuthAngle={-Math.PI / 12}
      maxAzimuthAngle={Math.PI / 12}
      enableZoom={true}
      enablePan={false}
      enableRotate={true}
      autoRotate={false}
      enableDamping
      dampingFactor={0.07}
      zoomSpeed={0.7} // האטת מהירות הזום
     
    />
  );
}

export default LimitedControls; 