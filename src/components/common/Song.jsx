import React, { useState, useEffect, useRef } from 'react';

/**
 * קומפוננט כפתור השמע לחדר התלת-ממדי
 * המוסיקה מתחילה אוטומטית כשהדף נטען והמשתמש יכול לכבות/להדליק
 */
const Song = ({ isPageLoading }) => {
  const [isPlaying, setIsPlaying] = useState(false); // מתחיל במצב OFF עד לאישור המשתמש
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef(null);

  console.log('🎼 קומפוננט Song נטען, מצב ראשוני:', isPlaying ? 'מנגן' : 'מושתק');

  // טעינת האודיו והפעלה אוטומטית
  useEffect(() => {
    const audio = new Audio('/Home Page Tone Sound Effect.mp3');
    audio.loop = true; // לולאה אינסופית
    audio.volume = 0.2; // עוצמה נמוכה יותר
    audio.preload = 'auto'; // טעינה מוקדמת
    audioRef.current = audio;

    // הפעלה אוטומטית
    audio.play()
      .then(() => {
        console.log('המוזיקה התחילה אוטומטית! ✅');
        setIsPlaying(true);
      })
      .catch(error => {
        console.log('דפדפן חוסם הפעלה אוטומטית:', error);
        setIsPlaying(false);
      });

    // ניקוי כשהקומפוננט נהרס
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // מאזין לסיום טעינת הדף
  useEffect(() => {
    if (!isPageLoading && audioRef.current) {
      console.log('✅ טעינת הדף הסתיימה');
    }
  }, [isPageLoading]);

  // טיפול בלחיצה על הכפתור - החלפה בין מצב ON למצב OFF
  const handleToggleSound = () => {
    if (!audioRef.current) {
      console.log('❌ אין אודיו זמין');
      return;
    }

    if (isPlaying) {
      // כיבוי המוסיקה
      audioRef.current.pause();
      setIsPlaying(false);
      console.log('🔇 המשתמש כיבה את המוזיקה');
    } else {
      // הפעלת המוסיקה
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log('🔊 המשתמש הדליק את המוזיקה');
        })
        .catch(error => {
          console.error('❌ שגיאה בהפעלת המוזיקה:', error);
          setIsPlaying(false);
        });
    }
  };

  // שלושת המצבים של האייקון
  
  // מצב רגיל - מוסיקה מתנגנת (Component 40.svg)
  const VolumeHighIcon = ({ isHovered }) => {
    if (isHovered) {
      // מצב hover - Group 150.svg (רמקול מלא)
      return (
        <svg width="32" height="26" viewBox="0 0 52 44" fill="none">
          <path 
            d="M31.0678 2C23.9433 5.79512 16.8155 9.58699 9.69101 13.3821H1V30.2959H9.69101C16.8155 34.1984 23.9433 38.0976 31.0678 42V2Z" 
            fill="white"
            stroke="white" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
          <path 
            d="M10 11L10 33" 
            stroke="#1D1C1A" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
          <path d="M39 17V26.5772" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M45 12V31.5317" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M51 10V34.0911" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
        </svg>
      );
    } else {
      // מצב רגיל - Component 40.svg (רמקול עם outline)
      return (
        <svg width="32" height="26" viewBox="0 0 52 44" fill="none">
          <path 
            d="M31.0678 2C23.9433 5.79512 16.8155 9.58699 9.69101 13.3821H1V30.2959H9.69101C16.8155 34.1984 23.9433 38.0976 31.0678 42V2Z" 
            stroke="white" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
          <path 
            d="M9.52344 13.2188V30.4545" 
            stroke="white" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
          <path d="M39 17V26.5772" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M45 12V31.5317" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M51 10V34.0911" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
        </svg>
      );
    }
  };

  // מצב שקט - Group 142.svg (רק רמקול בלי גלי קול)
  const VolumeMuteIcon = ({ isHovered }) => (
    <svg width="32" height="26" viewBox="0 0 33 44" fill="none">
      <path 
        d="M31.0678 2C23.9433 5.79512 16.8155 9.58699 9.69101 13.3821H1V30.2959H9.69101C16.8155 34.1984 23.9433 38.0976 31.0678 42V2Z" 
        fill={isHovered ? "white" : "none"}
        stroke="white" 
        strokeWidth="2" 
        strokeMiterlimit="10"
      />
      <path 
        d="M9.52344 13.2188V30.4545" 
        stroke={isHovered ? "#1D1C1A" : "white"} 
        strokeWidth="2" 
        strokeMiterlimit="10"
      />
    </svg>
  );

  // סגנונות הכפתור - שקוף בלי רקע
  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: '60px',
    height: '50px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    transition: 'all 0.2s ease-out',
    zIndex: 1000,
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    opacity: isHovered ? 0.8 : 1,
  };



  return (
    <>

      {/* כפתור השמע */}
      <button
        style={buttonStyle}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('נלחץ על כפתור הקול, מצב נוכחי:', isPlaying);
          handleToggleSound();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={isPlaying ? 'השתק מוזיקה' : 'הפעל מוזיקה'}
        aria-label={isPlaying ? 'השתק מוזיקה' : 'הפעל מוזיקה'}
      >
        {(() => {
          console.log(`🎵 מצב נוכחי: ${isPlaying ? 'מנגן' : 'מושתק'}, hover: ${isHovered}`);
          return isPlaying ? <VolumeHighIcon isHovered={isHovered} /> : <VolumeMuteIcon isHovered={isHovered} />;
        })()}
      </button>
    </>
  );
};

export default Song; 