import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Computer = () => {
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const handleNotebookClick = () => {
    navigate('/notebook');
  };

  const handleNextPage = () => {
    // נוכל להוסיף נווט לעמוד הבא בעתיד
    console.log('Navigate to next page');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#1D1C1A' }}>
      <div 
        className="relative overflow-hidden" 
        style={{ 
          width: '1920px', 
          height: '1080px', 
          backgroundColor: '#1D1C1A' 
        }}
      >
        
        {/* כפתור סגירה X */}
        <button
          className="fixed top-6 right-6 transition-opacity z-50 cursor-pointer"
          style={{ width: '34px', height: '34px' }}
          aria-label="Close"
          onClick={handleClose}
          onMouseEnter={() => setIsHoveringCloseButton(true)}
          onMouseLeave={() => setIsHoveringCloseButton(false)}
        >
          {isHoveringCloseButton ? (
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.7411 1.79167L32.2083 7.28371L22.6641 17.0169L32.2083 26.7151L26.7151 32.2083L17.0169 22.6641L7.28371 32.2083L1.79167 26.7151L11.4199 17.0169L1.79167 7.28371L7.41111 1.79167C7.41111 1.79167 13.9592 8.16621 17.0297 11.2325L26.7411 1.79167Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
          ) : (
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.7411 1.79167L32.2083 7.28371L22.6641 17.0169L32.2083 26.7151L26.7151 32.2083L17.0169 22.6641L7.28371 32.2083L1.79167 26.7151L11.4199 17.0169L1.79167 7.28371L7.41111 1.79167C7.41111 1.79167 13.9592 8.16621 17.0297 11.2325L26.7411 1.79167Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
          )}
        </button>

        {/* כפתור היומן */}
        <button
          className="fixed bottom-6 left-6 transition-opacity z-50 cursor-pointer"
          style={{ width: '47px', height: '36px' }}
          aria-label="Notebook"
          onClick={handleNotebookClick}
          onMouseEnter={() => setIsHoveringNotebookButton(true)}
          onMouseLeave={() => setIsHoveringNotebookButton(false)}
        >
          {isHoveringNotebookButton ? (
            <svg width="47" height="36" viewBox="0 0 47 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.15 6.6H0.96V35.04H46.08V6.6H39.46" fill="white"/>
              <path d="M7.15 6.6H0.96V35.04H46.08V6.6H39.46" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M7.69 0.95H40.22V28.68H7.69V0.95Z" fill="white" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M23.95 1.12V28.55" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M10.73 6.82H20.93" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M10.73 12.18H20.93" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M10.73 17.55H20.93" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M10.73 22.92H20.93" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M26.98 6.82H37.18" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M26.98 12.18H37.18" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M26.98 17.55H37.18" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M26.98 22.92H37.18" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
          ) : (
            <svg width="47" height="36" viewBox="0 0 47 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.95 1.12V28.55" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M7.69 0.95H40.22V28.68H7.69V0.95Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M10.73 6.82H20.93" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M10.73 12.18H20.93" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M10.73 17.55H20.93" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M10.73 22.92H20.93" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M26.98 6.82H37.18" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M26.98 12.18H37.18" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M26.98 17.55H37.18" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M26.98 22.92H37.18" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
              <path d="M7.15 6.6H0.96V35.04H46.08V6.6H39.46" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
          )}
        </button>

        {/* כפתור החץ */}
        <button
          className="fixed right-6 top-1/2 transform -translate-y-1/2 transition-opacity z-50 cursor-pointer"
          style={{ width: '29px', height: '45px' }}
          aria-label="Next Page"
          onClick={handleNextPage}
          onMouseEnter={() => setIsHoveringArrowButton(true)}
          onMouseLeave={() => setIsHoveringArrowButton(false)}
        >
          {isHoveringArrowButton ? (
            <svg width="29" height="45" viewBox="0 0 29 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.19 1.5L27.5 22.5L7.19 43.5L1.5 37.94L16.03 22.55L1.5 7.06L7.19 1.5Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
          ) : (
            <svg width="29" height="45" viewBox="0 0 29 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.19 1.5L27.5 22.5L7.19 43.5L1.5 37.94L16.03 22.55L1.5 7.06L7.19 1.5Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
          )}
        </button>

        {/* תוכן העמוד - כאן נוכל להוסיף תוכן בעתיד */}
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Computer Page</h1>
            <p className="text-xl opacity-70">התוכן של עמוד המחשב יתווסף כאן</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Computer; 