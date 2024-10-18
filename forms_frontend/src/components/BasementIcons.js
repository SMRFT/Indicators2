import React from 'react';

const BasementIcons = ({ handleIconClick }) => {
  return (
    <div style={{ display: 'flex' }} className='floor-icons'>
      <div style={{ width: '100px', height: '100px' }}>
        <div className="image-container" onClick={() => handleIconClick('HR')}>
          <img style={{ width: "100%", height: "100%"}} src="/HR.png" alt="HR" />
          <p className="image-text">HR</p>
        </div>
      </div>
      <div style={{ width: '100px', height: '100px' }}>
        <div className="image-container" onClick={() => handleIconClick('Lab')}>
          <img style={{ width: "100%", height: "100%"}} src="/Lab.png" alt="Lab" />
          <p className="image-text">Lab</p>
        </div>
      </div>
      <div style={{ width: '100px', height: '100px', marginLeft: '25px' }}>
        <div className="image-container" onClick={() => handleIconClick('XRay')}>
          <img style={{ width: "100%", height: "100%" }} src="/X-Ray.png" alt="XRay" />
          <p className="image-text">X-Ray</p>
        </div>
      </div>
      <div style={{ width: '100px', height: '100px', marginLeft: '25px' }}>
        <div className="image-container" onClick={() => handleIconClick('MRDForm')}>
          <img style={{ width: "100%", height: "100%" }} src="/MRD.png" alt="MRDForm" />
          <p className="image-text">MRD Form</p>
        </div>
      </div>
      <div style={{ width: '100px', height: '100px', marginLeft: '25px', marginTop:"-4%" }}>
        <div className="image-container" onClick={() => handleIconClick('ChemoWard')}>
          <img style={{ width: "150%", height: "140%" }} src="/Chemo.png" alt="Chemo Ward" />
          <p className="image-text" style={{ marginLeft: '25px', marginTop:"-2%",whiteSpace:"nowrap"}}>Chemo Ward</p>
        </div>
      </div>
    </div>
  );
};

export default BasementIcons;
