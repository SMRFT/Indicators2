import React from 'react';

const ThirdFloorIcons = ({ handleIconClick }) => {
  return (
    <div style={{ display: 'flex' }} className='floor-icons'> 
    <div style={{ width: '100px', height: '100px' }}>
       <div className="image-container" onClick={() => handleIconClick('ThirdFloor')}>
          <img style={{ width: "150%", height: "100%",marginLeft:"-20px"}} src="/First Floor.png" alt="Third Floor" />
          <p className="image-text">Third Floor</p>
        </div>
    </div>
    </div>
  );
};

export default ThirdFloorIcons;
