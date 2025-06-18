import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NootBookIcon = () => {
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const navigate = useNavigate();

  // פונקציה לחזרה לעמוד הראשי
  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#1D1C1A' }}>
      {/* כפתור סגירה */}
      <button
        className="fixed top-6 right-6 w-10 h-10 transition-opacity z-50"
        aria-label="Close"
        onClick={handleClose}
        onMouseEnter={() => setIsHoveringCloseButton(true)}
        onMouseLeave={() => setIsHoveringCloseButton(false)}
      >
        {isHoveringCloseButton ? (
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.8233 2L36 8.205L25.2381 19.0189L36 29.795L29.795 36L18.9811 25.2381L8.205 36L2 29.795L12.7619 19.0189L2 8.205L8.23333 2C8.23333 2 15.5103 9.10694 19.0331 12.5919L29.8233 2Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.8233 2L36 8.205L25.2381 19.0189L36 29.795L29.795 36L18.9811 25.2381L8.205 36L2 29.795L12.7619 19.0189L2 8.205L8.23333 2C8.23333 2 15.5103 9.10694 19.0331 12.5919L29.8233 2Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>

      {/* תוכן העמוד - The Hidden Room */}
      <div className="w-full h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-8">
            THE HIDDEN ROOM
          </h1>
          
          <div className="text-white text-lg leading-relaxed space-y-6">
            <p>
              This room is an exploration of visual Easter eggs: those small, hidden messages.
            </p>
            <p>
              From films and posters to brand logos and video games, each section invites
              you to look closer and uncover what's been hiding in plain sight.
            </p>
            <p className="mt-8">
              Hidden messages are all around us, all it takes is a closer look.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NootBookIcon; 