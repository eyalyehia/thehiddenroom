import React, { useEffect, useState } from 'react';

/**
 * Loading Screen Component displayed while the model is loading.
 */
function LoadingScreen({ progress = 0 }) {
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'All it takes is a closer look.';

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

  // אפקט לחשיפת הטקסט אות-אחר-אות עם ריחוף, מתחיל מ-10% טעינה
  useEffect(() => {
    // נחשב את אחוז ההתקדמות הרלוונטי לטקסט (0 ב-10%, 1 ב-100%)
    const textProgress = Math.max(0, Math.min(1, (smoothProgress - 10) / 90));
    const current = Math.floor(textProgress * fullText.length);
    setDisplayedText(fullText.slice(0, current));
  }, [smoothProgress]);

  // פונקציה ליצירת אפקט ריחוף לכל אות
  const renderAnimatedText = () => {
    return (
      <span style={{ display: 'inline-block' }}>
        {fullText.split('').map((char, i) => {
          const isVisible = i < displayedText.length;
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0px)' : 'translateY(6px)',
                transition: 'opacity 1s cubic-bezier(.4,2,.6,1), transform 1s cubic-bezier(.4,2,.6,1)',
                transitionDelay: isVisible ? `${i * 0.12}s` : '0s',
                color: '#FFFFFF',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </span>
    );
  };

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
      width: '100vw',
      height: '100vh',
      background: '#1D1C1A',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Circular Progress */}
        <div style={{ position: 'relative', marginBottom: '0px' }}>
          <svg width={260} height={260} style={{ display: 'block' }}>
            {/* גבול חיצוני */}
            <circle
              cx={130}
              cy={130}
              r={120}
              stroke="#FFFFFF"
              strokeWidth={2}
              fill="none"
            />
            {/* רקע בין הגבולות */}
            <circle
              cx={130}
              cy={130}
              r={110}
              fill="#1D1C1A"
              stroke="none"
            />
            {/* גבול פנימי */}
            <circle
              cx={130}
              cy={130}
              r={100}
              stroke="#FFFFFF"
              strokeWidth={2}
              fill="none"
            />
            {/* עיגול התקדמות עבה */}
            <circle
              cx={130}
              cy={130}
              r={110}
              stroke="#FFFFFF"
              strokeWidth={10}
              fill="none"
              strokeDasharray={2 * Math.PI * 110}
              strokeDashoffset={(1 - smoothProgress / 100) * 2 * Math.PI * 110}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.3s ease',
                transform: 'rotate(-90deg)', // הוספת סיבוב כדי להתחיל מלמעלה
                transformOrigin: '130px 130px', // מרכז העיגול
              }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Work Sans',
            fontWeight: 300,
            fontStyle: 'Light',
            fontSize: '20px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '160px',
            height: '160px',
            textAlign: 'center',
          }}>
            {Math.round(smoothProgress)}<span style={{fontSize: '1.2rem', marginRight: '2px'}}>%</span>
          </div>
        </div>
        {/* טקסט מתחת לעיגול */}
        <div style={{
          marginTop: '38px',
          color: '#FFFFFF',
          fontFamily: 'Work Sans',
          fontWeight: 300,
          fontStyle: 'Light',
          fontSize: '20px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'center',
          minHeight: '32px',
          userSelect: 'none',
          width: '100%',
        }}>
          {renderAnimatedText()}
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen; 