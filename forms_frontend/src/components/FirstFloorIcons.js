import React from 'react';

const FirstFloorIcons = ({ handleIconClick }) => {
  return (
    <div style={{ display: 'flex' }} className='floor-icons'>
    <div style={{ width: '100px', height: '100px' }}>
        <div className="image-container" onClick={() => handleIconClick('FirstFloor')}>
          <img style={{ width: "100%", height: "100%"}} src="/First Floor.png" alt="First Floor" />
          <p className="image-text">First Floor</p>
        </div>
    </div>
    <div style={{ width: '100px', height: '100px', marginLeft: '25px', marginTop:'-5px' }}>
        <div className="image-container" onClick={() => handleIconClick('FirstSuit')}>
          <img style={{ width: "100%", height: "100%" }} src="/First Suit.png" alt="First Suit" />
          <p className="image-text">First Suit</p>
        </div>
    </div>
    <div style={{ width: '100px', height: '100px', marginLeft: '25px', marginTop:'-5px' }}>
        <div className="image-container" onClick={() => handleIconClick('MICUForm')}>
          <img style={{ width: "100%", height: "150%", marginTop:'-15px' }} src="/SICU.png" alt="MICU Form" />
          <p className="image-text" style={{ marginTop:'-5px'}}>MICU Form</p>
        </div>
    </div>
    <div style={{ width: '100px', height: '100px', marginLeft: '25px', marginTop:'-5px' }}>
        <div className="image-container" onClick={() => handleIconClick('NICUForm')}>
          <img style={{ width: "100%", height: "150%", marginTop:'-15px' }} src="/SICU.png" alt="NICU Form" />
          <p className="image-text" style={{ marginTop:'-5px'}}>NICU Form</p>
        </div>
    </div>
    <div style={{ width: '100px', height: '100px', marginLeft: '25px', marginTop:'-5px' }}>
        <div className="image-container" onClick={() => handleIconClick('Dialysis')}>
          <img style={{ width: "100%", height: "100%" }} src="/Dialysis.png" alt="Dialysis" />
          <p className="image-text">Dialysis</p>
        </div>
    </div>
    <div style={{ width: '100px', height: '100px', marginLeft: '25px', marginTop:'-5px' }}>
        <div className="image-container" onClick={() => handleIconClick('OTForm')}>
          <img style={{ width: "100%", height: "100%" }} src="/OT.png" alt="OTForm" />
          <p className="image-text">OT Form</p>
        </div>
    </div>
    <div style={{ width: '100px', height: '100px', marginLeft: '25px', marginTop:'-5px' }}>
        <div className="image-container" onClick={() => handleIconClick('RecoveryWard')}>
          <img style={{ width: "100%", height: "100%" }} src="/Recovery Ward.png" alt="Recovery Ward" />
          <p className="image-text">Recovery Ward</p>
        </div>
    </div>
  </div>
  );
};

export default FirstFloorIcons;
