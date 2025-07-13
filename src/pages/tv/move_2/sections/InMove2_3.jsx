import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InMove2_3 = () => {
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative w-full h-screen" style={{ backgroundColor: '#1D1C1A' }}>
      {/* Back Button */}
      <button
        className="absolute top-6 right-6 transition-opacity z-50 cursor-pointer"
        style={{ width: '29px', height: '45px' }}
        onClick={handleBack}
        onMouseEnter={() => setIsHoveringBackButton(true)}
        onMouseLeave={() => setIsHoveringBackButton(false)}
      >
        {isHoveringBackButton ? (
          <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>

      {/* Full Screen Image */}
      <img 
        src="/tv/pictures/tv1/move-2/regular/03.png"
        alt="Full Screen Scene"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default InMove2_3;
