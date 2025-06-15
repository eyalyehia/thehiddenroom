import React from 'react';
import { ELEMENTS_MAP } from '../constant';

function HoverInfo({ hovered }) {
  if (!hovered) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      zIndex: 1000,
      direction: 'rtl',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      {ELEMENTS_MAP[hovered]}
    </div>
  );
}

export default HoverInfo; 