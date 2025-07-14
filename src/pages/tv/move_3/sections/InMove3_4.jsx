import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getBase64 from '../../../../components/common/getBase64';

const InMove3_4 = () => {
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadImage = async () => {
      const img = await getBase64('/tv/pictures/tv1/move-3/regular/04.png');
      setImage(img);
    };

    loadImage();
  }, []);

  const handleBack = () => {
    navigate('/tv/move_3/main/Move3');
  };

  return (
    <div className="w-full h-screen relative" style={{ backgroundColor: '#1D1C1A' }}>
      {/* Back Button - Top Right */}
      <button
        className="absolute top-6 right-6 transition-opacity z-50 cursor-pointer"
        style={{ width: '29px', height: '45px' }}
        aria-label="Back"
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
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src={image || "/tv/pictures/tv1/move-3/regular/04.png"}
          alt="Scene 4 Full Screen"
          className="w-full h-full object-cover"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      </div>
    </div>
  );
};

export default InMove3_4;