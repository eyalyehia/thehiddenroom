import React from 'react';

/**
 * Loading Screen Component displayed while the model is loading.
 */
function LoadingScreen({ progress = 0 }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#1a1611',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      zIndex: 9999
    }}>
      <div style={{ textAlign: 'center' }}>
        <div>Loading...</div>
        <div style={{ marginTop: '20px', fontSize: '16px' }}>אנא המתן</div>
        <div style={{ 
          marginTop: '30px', 
          width: '300px', 
          height: '4px', 
          backgroundColor: '#333', 
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#4CAF50',
            transition: 'width 0.3s ease',
            borderRadius: '2px'
          }}></div>
        </div>
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen; 