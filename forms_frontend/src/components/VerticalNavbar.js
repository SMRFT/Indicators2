import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { FaFileAlt, FaHome, FaTable, FaUserPlus, FaWpforms, FaChevronDown, FaChevronUp, FaSquareRootAlt } from 'react-icons/fa';
import Logo from '../images/smrft.png';
import './VerticalNavbar.css'; 

const Sidebar = ({ userRole = '', loginMethod = '', location = '' }) => {
  const [reportDropdownOpen, setReportDropdownOpen] = useState(false);
  
  const toggleReportDropdown = () => {
    setReportDropdownOpen(!reportDropdownOpen);
  };

  console.log("Rendering Sidebar with userRole:", userRole);

  // Render a placeholder or default content if userRole is not defined
  if (!userRole) {
    console.log("User role is not defined"); // Debug log
    return (
      <div className="sidebar-placeholder">
        Loading...
      </div>
    );
  }

  let content;

  // For Admin, when login through Admin Login or Employee Login
  if (userRole === 'Admin') {
    content = (
      <>
        <div className="sidebar-dropdown">
          <CDBSidebarMenuItem className="sidebar-menu-item" onClick={toggleReportDropdown}>
            <FaFileAlt />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reports {reportDropdownOpen ? <FaChevronUp size={10} /> : <FaChevronDown size={10}/>}
          </CDBSidebarMenuItem>
          {reportDropdownOpen && (
            <div className="sidebar-dropdown-content">
              <NavLink exact to="/Report" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="sidebar-menu-item">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;General Report
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/MasterDataReport" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="sidebar-menu-item">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Master Data Report
                </CDBSidebarMenuItem>
              </NavLink>
            </div>
          )}
        </div>
        <NavLink exact to="/Register" activeClassName="activeClicked">
          <CDBSidebarMenuItem className="sidebar-menu-item">
            <FaUserPlus />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Registration
          </CDBSidebarMenuItem>
        </NavLink>
        <NavLink exact to="/Availability" activeClassName="activeClicked">
          <CDBSidebarMenuItem className="sidebar-menu-item">
            <FaTable />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Availability
          </CDBSidebarMenuItem>
        </NavLink>
        <NavLink exact to="/Formula" activeClassName="activeClicked">
          <CDBSidebarMenuItem className="sidebar-menu-item">
            <FaSquareRootAlt/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formula
          </CDBSidebarMenuItem>
        </NavLink>
      </>
    );
  }

  // List of paths where "MasterData" should not be displayed
  const excludedPaths = ['/Lab', '/XRay', '/CT', '/MRI','/MRDForm','/FrontOffice','/Dialysis',
    '/Physiotherapy','/HR','/OPD','/OTForm','IPPharmacy','IPPharmacy'];

  // Determine the appropriate MasterData route based on the current location
  const getMasterDataRoute = (pathname) => {
    if (pathname.includes('FirstFloor')) return '/FirstFloorRawData';
    if (pathname.includes('SecondFloor')) return '/SecondFloorRawData';
    if (pathname.includes('FirstSuit')) return '/FirstSuitRawData';
    if (pathname.includes('SecondSuit')) return '/SecondSuitRawData';
    if (pathname.includes('ThirdFloor')) return '/ThirdFloorRawData';
    if (pathname.includes('RecoveryWard')) return '/RecoveryWardRawData';
    if (pathname.includes('ChemoWard')) return '/ChemoWardRawData';
    if (pathname.includes('EmergencyRoom')) return '/EmergencyRoomRawData';
    if (pathname.includes('SICU')) return '/SICURawData';
    if (pathname.includes('NICU')) return '/NICURawData';
    if (pathname.includes('MICU')) return '/MICURawData';
    return '/FirstFloorRawData'; // Default route if none match
  };

  // For both Admin and Employee when login through Employee Login or Employee logs in
  if (loginMethod === 'EmployeeLogin' || userRole === 'Employee' || (userRole === 'Admin' && loginMethod === 'EmployeeLogin')) {
    content = (
      <>
        {!excludedPaths.includes(location.pathname) && (
          <NavLink exact to={getMasterDataRoute(location.pathname)} activeClassName="activeClicked">
            <CDBSidebarMenuItem className="sidebar-menu-item">
              <FaWpforms />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Master Data
            </CDBSidebarMenuItem>
          </NavLink>
        )}
      </>
    );
  }

  return (
    <div className="sidebar-container">
      <CDBSidebar textColor="Black" backgroundColor="#ECF8F9">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <img src={Logo} alt="Shanmuga Hospital Logo" style={{ maxWidth: "80%" }} />
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-menu-item">
                <FaHome />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home
              </CDBSidebarMenuItem>
            </NavLink>
            {content}
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
