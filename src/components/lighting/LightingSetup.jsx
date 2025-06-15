import React from 'react';

/**
 * קומפוננט להגדרת כל התאורה בסצנה
 * @param {Object} lightSettings - הגדרות התאורה מהבקרות
 */
const LightingSetup = ({ lightSettings }) => {
  return (
    <>
      {/* תאורה כללית */}
      <ambientLight 
        intensity={lightSettings['עוצמה כללית']} 
        color={lightSettings['צבע תאורה כללית']} 
      />

      {/* מנורת השולחן */}
      <spotLight
        position={[-1.2, 4.5, 2.2]}
        angle={lightSettings['זווית מנורה']}
        penumbra={lightSettings['רכות קצוות']}
        intensity={lightSettings['עוצמת מנורה']}
        color={lightSettings['צבע מנורה']}
        target-position={[-0.5, 1.5, 2]}
        distance={8}
        decay={1.0}
      />

      {/* תאורת תקרה כללית */}
      <pointLight
        position={[0, 3.8, 2.5]}
        intensity={4.2}
        color="#f4d03f"
        distance={10}
        decay={1.4}
      />

      {/* תאורת מסך המחשב */}
      <pointLight
        position={[0, 3, 3.2]}
        intensity={lightSettings['עוצמת מסך']}
        color={lightSettings['צבע מסך']}
        distance={9}
        decay={1.3}
      />

      {/* תאורת מחשב צדדית */}
      <spotLight
        position={[0.8, 3.5, 3.0]}
        angle={Math.PI / 4}
        penumbra={0.2}
        intensity={lightSettings['עוצמת מחשב צדדי']}
        color={lightSettings['צבע מחשב צדדי']}
        target-position={[0, 2.8, 3.2]}
        distance={7}
        decay={1.2}
      />

      {/* תאורת פוסטר שמאל - אור ראשי */}
      <spotLight
        position={[-2.8, 4.2, 1.2]}
        angle={Math.PI / 5.5}
        penumbra={0.1}
        intensity={18.0}
        color="#ff6000"
        target-position={[-2.8, 3.0, 0]}
        distance={8}
        decay={0.8}
      />

      {/* תאורת פוסטר שמאל - אור משני */}
      <spotLight
        position={[-3.2, 5.5, 1.0]}
        angle={Math.PI / 7}
        penumbra={0.05}
        intensity={12.5}
        color="#ffb74d"
        target-position={[-2.9, 4.5, 0]}
        distance={6}
        decay={0.9}
      />

      {/* תאורת פוסטר שמאל - אור שלישי */}
      <spotLight
        position={[-1.2, 4.5, 2.2]}
        angle={Math.PI / 2.6}
        penumbra={0.2}
        intensity={15.0}
        color="#ffa726"
        target-position={[-2.8, 3.5, 0]}
        distance={10}
        decay={0.9}
      />

      {/* תאורת פוסטר שמאל - אור רביעי */}
      <spotLight
        position={[-3.2, 3.0, 1.2]}
        angle={Math.PI / 6}
        penumbra={0.1}
        intensity={10.0}
        color="#ff9100"
        target-position={[-2.9, 2.0, 0]}
        distance={7}
        decay={1.0}
      />

      {/* תאורת פוסטר ימין */}
      <spotLight
        position={[-1.2, 4.5, 2.2]}
        angle={Math.PI / 4}
        penumbra={0.3}
        intensity={lightSettings['עוצמת פוסטר ימין']}
        color={lightSettings['צבע פוסטר ימין']}
        target-position={[-2, 4.5, 0]}
        distance={9}
        decay={1.6}
      />

      {/* תאורת אביזרים - כללית */}
      <pointLight
        position={[1.8, 3, 2.2]}
        intensity={3.2}
        color="#f39c12"
        distance={6}
        decay={1.8}
      />

      {/* תאורת מסך נוספת */}
      <pointLight
        position={[0, 4.5, 3.5]}
        intensity={4.8}
        color="#ff4757"
        distance={8}
        decay={1.3}
      />

      {/* תאורת מקלדת */}
      <spotLight
        position={[-0.5, 3.8, 3.8]}
        angle={Math.PI / 5}
        penumbra={0.15}
        intensity={lightSettings['עוצמת מקלדת']}
        color={lightSettings['צבע מקלדת']}
        target-position={[0, 2.5, 3.2]}
        distance={7}
        decay={1.3}
      />

      {/* תאורת ג'ויסטיק */}
      <pointLight
        position={[0.5, 3.2, 2.8]}
        intensity={lightSettings['עוצמת ג\'ויסטיק']}
        color={lightSettings['צבע ג\'ויסטיק']}
        distance={5}
        decay={1.6}
      />
    </>
  );
};

export default LightingSetup; 