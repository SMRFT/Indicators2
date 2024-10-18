import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './components/LandingPage';
import { AdminLogin, EmployeeLogin } from './components/Login';
import Availability from './components/Availability';
import Formula from './components/Formula';
import Physiotherapy from './components/Physiotherapy';
import FirstSuit from './components/FirstSuit';
import FirstFloor from './components/FirstFloor';
import FrontOffice from './components/FrontOffice';
import SecondSuit from './components/SecondSuit';
import ThirdFloor from './components/ThirdFloor';
import CT from './components/CT';
import ChemoWard from './components/ChemoWard';
import EmergencyRoom from './components/EmergencyRoom';
import Lab from './components/Lab';
import OTForm from './components/OTForm';
import XRay from './components/X-Ray';
import MRDForm from './components/MRDForm';
import MICUForm from './components/MICUForm';
import NICUForm from './components/NICUForm';
import Dialysis from './components/Dialysis';
import RecoveryWard from './components/RecoveryWard';
import SecondFloor from './components/SecondFloor';
import SICUForm from './components/SICUForm';
import MRI from './components/MRI';
import Report from './components/Report';
import Register from './components/Register';
import FirstFloorRawData from './components/FirstFloorRawData';
import SecondFloorRawData from './components/SecondFloorRawData';
import OPPharmacy from './components/OPPharmacy';
import Logo from '../src/images/shanmuga-hospital-logo.jpg';
import Sidebar from './components/VerticalNavbar';
import './App.css';
import SecondSuitRawData from './components/SecondSuitRawData';
import FirstSuitRawData from './components/FirstSuitRawData';
import MasterDataReport from './components/MasterDataReport';
import OPD from './components/OPD';
import HR from './components/HR';
import IPPharmacy from './components/IPPharmacy';
import RecoveryWardRawData from './components/RecoveryWardRawData';
import SICURawData from './components/SICURawData';
import NICURawData from './components/NICURawData';
import MICURawData from './components/MICURawData';
import ThirdFloorRawData from './components/ThirdFloorRawData';
import EmergencyRoomRawData from './components/EmergencyRoomRawData';
import ChemoWardRawData from './components/ChemoWardRawData';

function App() {
  const location = useLocation();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'));
  }, [location]);

  const showSidebar = userRole && !['/', '/Login', '/AdminLogin', '/EmployeeLogin'].includes(location.pathname);
  const showLogo = !showSidebar && location.pathname !== '/';
  const hideMainContent = ['/','/Login','/AdminLogin','/EmployeeLogin','/Register','/Availability','/Report','/MasterDataReport',
    '/FirstFloorRawData','/FirstSuitRawData','/SecondFloorRawData','./SecondSuitRawData','/ThirdFloorRawData','/RecoveryWardRawData',
    '/ChemoWardRawData','/EmergencyRoomRawData','/SICURawData','/NICURawData','/MICURawData'].includes(location.pathname);

  console.log("Rendering App with userRole:", userRole);

  return (
    <div className="App">
      {showLogo && (
        <div className="logo-container">
          <img src={Logo} alt="Shanmuga Hospital Logo" className="logo" />
        </div>
      )}
      {showSidebar && (
        <div className="top-container">
          <Sidebar userRole={userRole} location={location} />
        </div>
      )}

      <div className={hideMainContent ? '' : 'main-content'}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/EmployeeLogin' element={<EmployeeLogin setUserRole={setUserRole} />} />
          <Route path='/AdminLogin' element={<AdminLogin setUserRole={setUserRole} />} />
          <Route path='/Register' element={<Register />} />
          <Route path="/Availability" element={<Availability />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/MasterDataReport" element={<MasterDataReport />} />
          <Route path="/Formula" element={<Formula />} />
          <Route path='/FrontOffice' element={<FrontOffice />} />
          <Route path='/FirstSuit' element={<FirstSuit />} />
          <Route path='/FirstFloor' element={<FirstFloor />} />
          <Route path='/SecondFloor' element={<SecondFloor />} />
          <Route path='/SecondSuit' element={<SecondSuit />} />
          <Route path='/ThirdFloor' element={<ThirdFloor />} />
          <Route path='/CT' element={<CT />} />
          <Route path='/Lab' element={<Lab />} />
          <Route path='/MRI' element={<MRI />} />
          <Route path='/XRay' element={<XRay />} />
          <Route path='/OPD' element={<OPD />} />
          <Route path='/OTForm' element={<OTForm />} />
          <Route path='/HR' element={<HR />} />
          <Route path='/Dialysis' element={<Dialysis />} />
          <Route path='/Physiotherapy' element={<Physiotherapy />} />
          <Route path='/OPPharmacy' element={<OPPharmacy />} />
          <Route path='/IPPharmacy' element={<IPPharmacy />} />
          <Route path='/EmergencyRoom' element={<EmergencyRoom />} />
          <Route path='/MRDForm' element={<MRDForm />} />
          <Route path='/ChemoWard' element={<ChemoWard />} />
          <Route path='/RecoveryWard' element={<RecoveryWard />} />
          <Route path='/SICUForm' element={<SICUForm />} />
          <Route path='/MICUForm' element={<MICUForm />} />
          <Route path='/NICUForm' element={<NICUForm />} />
          <Route path='/FirstFloorRawData' element={<FirstFloorRawData />} />
          <Route path='/FirstSuitRawData' element={<FirstSuitRawData />} />
          <Route path='/SecondFloorRawData' element={<SecondFloorRawData />} />
          <Route path='/SecondSuitRawData' element={<SecondSuitRawData />} />
          <Route path='/ThirdFloorRawData' element={<ThirdFloorRawData />} />
          <Route path='/RecoveryWardRawData' element={<RecoveryWardRawData />} />
          <Route path='/ChemoWardRawData' element={<ChemoWardRawData />} />
          <Route path='/EmergencyRoomRawData' element={<EmergencyRoomRawData />} />
          <Route path='/SICURawData' element={<SICURawData />} />
          <Route path='/NICURawData' element={<NICURawData />} />
          <Route path='/MICURawData' element={<MICURawData />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
