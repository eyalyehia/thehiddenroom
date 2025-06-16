import React, { useEffect, useState } from 'react';

/**
 * Loading Screen Component displayed while the model is loading.
 */
function LoadingScreen({ progress = 0 }) {
  const [dots, setDots] = useState('');
  const [pulseOpacity, setPulseOpacity] = useState(1);
  const [smoothProgress, setSmoothProgress] = useState(0);

  // Smooth progress animation
  useEffect(() => {
    const duration = 200; // זמן אנימציה ב-ms
    const startProgress = smoothProgress;
    const targetProgress = progress;
    const startTime = Date.now();

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      
      // Easing function לתנועה חלקה
      const easeOut = 1 - Math.pow(1 - ratio, 3);
      const currentProgress = startProgress + (targetProgress - startProgress) * easeOut;
      
      setSmoothProgress(currentProgress);
      
      if (ratio < 1) {
        requestAnimationFrame(animateProgress);
      }
    };

    if (Math.abs(targetProgress - startProgress) > 0.5) {
      requestAnimationFrame(animateProgress);
    }
  }, [progress, smoothProgress]);

  // Animated dots effect - מהיר יותר
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 300); // מהיר יותר
    return () => clearInterval(interval);
  }, []);

  // Pulse effect for loading text - מהיר יותר
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseOpacity(prev => prev === 1 ? 0.7 : 1);
    }, 800); // מהיר יותר
    return () => clearInterval(interval);
  }, []);

  const CircularProgress = ({ size = 120, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (smoothProgress / 100) * circumference;

    return (
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.3s ease',
            filter: 'drop-shadow(0 0 10px rgba(76, 175, 80, 0.5))'
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="50%" stopColor="#81C784" />
            <stop offset="100%" stopColor="#A5D6A7" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1611 50%, #2d2d2d 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 50%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(129, 199, 132, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(165, 214, 167, 0.08) 0%, transparent 50%)
        `,
        animation: 'float 6s ease-in-out infinite',
        zIndex: -1
      }} />

      <div style={{ 
        textAlign: 'center',
        position: 'relative',
        padding: '40px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        minWidth: '320px'
      }}>
        {/* Circular Progress */}
        <div style={{ position: 'relative', marginBottom: '30px' }}>
          <CircularProgress />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#4CAF50',
            textShadow: '0 0 10px rgba(76, 175, 80, 0.5)'
          }}>
            {Math.round(smoothProgress)}%
          </div>
        </div>

        {/* Loading Text */}
        <div style={{
          fontSize: '28px',
          fontWeight: '300',
          marginBottom: '10px',
          opacity: pulseOpacity,
          transition: 'opacity 1s ease',
          letterSpacing: '2px'
        }}>
          Loading{dots}
        </div>

        <div style={{
          fontSize: '16px',
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '25px',
          fontWeight: '300'
        }}>
          Please wait while we prepare your experience
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '280px',
          height: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
          margin: '0 auto',
          position: 'relative'
        }}>
          <div style={{
            width: `${smoothProgress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #4CAF50, #81C784, #A5D6A7)',
            borderRadius: '10px',
            transition: 'width 0.1s ease-out',
            boxShadow: '0 0 15px rgba(76, 175, 80, 0.6)',
            position: 'relative'
          }}>
            {/* Animated shine effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              animation: 'shine 2s infinite'
            }} />
          </div>
        </div>

        {/* Loading stages indicator */}
        <div style={{
          marginTop: '20px',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.5)',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {smoothProgress < 25 ? 'Initializing...' :
           smoothProgress < 50 ? 'Loading Assets...' :
           smoothProgress < 75 ? 'Processing Data...' :
           smoothProgress < 95 ? 'Finalizing...' : 'Almost Ready!'}
        </div>
      </div>

      {/* CSS Animations injected via style tag */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
          }
          
          @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `
      }} />
    </div>
  );
}

export default LoadingScreen; 