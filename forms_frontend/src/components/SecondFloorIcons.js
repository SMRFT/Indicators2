import React from 'react';

const SecondFloorIcons = ({ handleIconClick }) => {
  return (
    <div style={{ display: 'flex' }} className='floor-icons'>
    <div style={{ width: '100px', height: '100px' }}>
        <div className="image-container" onClick={() => handleIconClick('SecondFloor')}>
          <img style={{ width: "150%", height: "120%", marginLeft:"-20px", marginTop:"-10px"}} src="/First Floor.png" alt="Second Floor" />
          <p className="image-text" style={{marginTop:"-5px"}}>Second Floor</p>
        </div>
    </div>
    <div style={{ width: '100px', height: '100px' }}>
        <div className="image-container" onClick={() => handleIconClick('SecondSuit')}>
          <img style={{ width: "150%", height: "100%", marginLeft:"10px"}} src="/Second Suit.png" alt="Second Suit" />
          <p className="image-text" style={{marginLeft:"35px"}}>Second Suit</p>
        </div>

    </div>
    <div style={{ width: '100px', height: '100px' }}>
        <div className="image-container" onClick={() => handleIconClick('SICUForm')}>
          <img style={{ width: "150%", height: "120%", marginLeft:"50px",marginTop:"-20px"}} src="/SICU.png" alt="SICU" />
          <p className="image-text" style={{marginLeft:"80px"}}>SICU Form</p>
        </div>
    </div>
    </div>
  );
};

export default SecondFloorIcons;
