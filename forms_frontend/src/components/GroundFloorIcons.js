import React from 'react';

const GroundFloorIcons = ({ handleIconClick }) => {
  return (
    <div style={{ display: 'flex' }} className='floor-icons'>
    <div style={{ width: '100px', height: '100px', marginTop:"-10%" }}>
        <div className="image-container" onClick={() => handleIconClick('EmergencyRoom')}>
          <img style={{ width: "150%", height: "150%" }} src="/Emergency Room.png" alt="Emergency Room" />
          <p className="image-text" style={{ marginTop:"-15px"}}>Emergency Room</p>
        </div>
    </div>
    <div style={{ width: '100px', height: '100px', marginTop:"-7%" , marginLeft: '100px' }}>
        <div className="image-container" onClick={() => handleIconClick('FrontOffice')}>
          <img style={{ width: "150%", height: "120%" }} src="/Front Office.png" alt="Front Office" />
          <p className="image-text" style={{ marginLeft: '25px'}}>Front Office</p>
        </div>
    </div>
    <div style={{ width: '100px', height: '100px', marginTop:"-7%" , marginLeft: '100px' }}>
        <div className="image-container" onClick={() => handleIconClick('OPD')}>
          <img style={{ width: "150%", height: "120%" }} src="/OPD.png" alt="OPD" />
          <p className="image-text" style={{ marginLeft: '25px'}}>OPD</p>
        </div>
    </div>
    </div>
  );
};

export default GroundFloorIcons;
