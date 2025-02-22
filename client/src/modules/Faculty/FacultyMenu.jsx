import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronRight, FaHome, FaArchive, FaForumbee,FaBell, FaBriefcase, FaUserCircle } from "react-icons/fa";
import useProfileStore from '../../store/useProfileStore';

const Menu = ({ isProfilePage, isMobileMenuOpen, setIsMobileMenuOpen, isDiscussionPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profileData } = useProfileStore();

  // Check if current page should have collapsed menu
  const shouldCollapseMenu = isProfilePage || isDiscussionPage || location.pathname === '/Faculty/FacultyForum';


  const menuItems = [
    { text: "Dashboard", icon: <FaHome size={20} />, path: "/faculty/Dashboard" },
    { text: "Appointments", icon: <FaBriefcase size={20} />, path: "/faculty/FacultyAppointments" },
    { text: "Project Resources", icon: <FaArchive size={20} />, path: "/faculty/FacultyProjectResources" },
    { text: "Discussion Forum", icon: <FaForumbee size={20} />, path: "/faculty/FacultyForum" },
  ];

  const bottomMenuItems = [
    { text: "Notifications", icon: <FaBell size={20} />, path: "/faculty/FacultyNotifications" },
    { text: "Settings", icon: <FaUserCircle size={20} />, path: "/faculty/FacultySettings" },
  ];

  const handleClick = (item) => {
    navigate(item.path);
    setIsMobileMenuOpen(false);
  };

  // Mobile Menu Overlay
  const MobileMenu = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden
      ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <div className={`fixed top-0 left-0 h-full w-full bg-[#272750] transform transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Info Section */}
        <div className="bg-[#272750] p-4 pt-20">
          <div className="flex items-center space-x-3 mb-4 border-b border-[#212150] pb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
              {profileData.profilePic ? (
                <img 
                  src={profileData.profilePic} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-400" />
              )}
            </div>
            <div className="text-white">
              <p className="text-sm font-medium">Welcome,</p>
              <p className="text-xs opacity-90 py-1">{profileData.name}</p>
              <p className="text-xs opacity-75">Student ID: {profileData.regNumber}</p>
            </div>
          </div>
        </div>

        {/* Main Menu Items */}
        <div className="flex-1">
          {menuItems.map((item) => (
            <div 
              key={item.path} 
              className={`flex flex-col ${
                location.pathname === item.path ? 'bg-[#212150]' : ''
              }`}
              onClick={() => handleClick(item)}
            >
              <div className="flex items-center justify-between py-4 hover:bg-[#212150] cursor-pointer transition-all duration-200 ease-in-out">
                <div className="flex items-center gap-4 pl-6">
                  <span className={`text-white ${
                    location.pathname === item.path ? 'text-yellow-400' : ''
                  }`}>{item.icon}</span>
                  <span className={`font-medium text-lg tracking-wide text-white ${
                    location.pathname === item.path ? 'text-yellow-400' : ''
                  }`}>{item.text}</span>
                </div>
                <FaChevronRight 
                  size={14} 
                  className={`mr-4 ${location.pathname === item.path ? 'text-yellow-400' : 'text-white'}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Menu Items */}
        <div className="border-t border-[#212150]">
          {bottomMenuItems.map((item) => (
            <div 
              key={item.path} 
              className={`flex flex-col ${
                location.pathname === item.path ? 'bg-[#212150]' : ''
              }`}
              onClick={() => handleClick(item)}
            >
              <div className="flex items-center justify-between py-4 hover:bg-[#212150] cursor-pointer transition-all duration-200 ease-in-out">
                <div className="flex items-center gap-4 pl-6">
                  <span className={`text-white ${
                    location.pathname === item.path ? 'text-yellow-400' : ''
                  }`}>{item.icon}</span>
                  <span className={`font-medium text-lg tracking-wide text-white ${
                    location.pathname === item.path ? 'text-yellow-400' : ''
                  }`}>{item.text}</span>
                </div>
                <FaChevronRight 
                  size={14} 
                  className={`mr-4 ${location.pathname === item.path ? 'text-yellow-400' : 'text-white'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Desktop Menu
  const DesktopMenu = () => {
    const isCollapsed = shouldCollapseMenu;
    
    return (
      <div className={`hidden md:flex flex-col text-white ${
        isCollapsed ? "w-16" : "w-60"
      } bg-[#272750] transition-all duration-300 ease-in-out`}
      >
        {/* Main Menu Items */}
        <div className="flex-1 flex flex-col pt-4">
          {menuItems.map((item) => (
            <div 
              key={item.path} 
              className={`flex flex-col border-b border-[#212150] ${
                location.pathname === item.path ? 'bg-[#212150]' : ''
              }`}
              onClick={() => handleClick(item)}
            >
              <div className={`flex items-center py-[16px] hover:bg-[#212150] cursor-pointer 
                transition-all duration-200 ease-in-out ${isCollapsed ? 'justify-center' : ''}`}
              >
                <div className={`flex items-center gap-4 ${isCollapsed ? 'pl-0' : 'pl-6'}`}>
                  <span className={`text-white ${
                    location.pathname === item.path ? 'text-yellow-400' : ''
                  }`}>{item.icon}</span>
                  {!isCollapsed && (
                    <span className={`font-medium text-sm tracking-wide ${
                      location.pathname === item.path ? 'text-yellow-400' : ''
                    }`}>{item.text}</span>
                  )}
                </div>
                {!isCollapsed && (
                  <FaChevronRight 
                    size={14} 
                    className={`ml-auto mr-4 ${location.pathname === item.path ? 'text-yellow-400' : 'text-white'}`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Menu Items */}
        <div className="border-t border-[#212150]">
          {bottomMenuItems.map((item) => (
            <div 
              key={item.path} 
              className={`flex flex-col ${
                location.pathname === item.path ? 'bg-[#212150]' : ''
              }`}
              onClick={() => handleClick(item)}
            >
              <div className={`flex items-center py-[16px] hover:bg-[#212150] cursor-pointer 
                transition-all duration-200 ease-in-out ${isCollapsed ? 'justify-center' : ''}`}
              >
                <div className={`flex items-center gap-4 ${isCollapsed ? 'pl-0' : 'pl-6'}`}>
                  <span className={`text-white ${
                    location.pathname === item.path ? 'text-yellow-400' : ''
                  }`}>{item.icon}</span>
                  {!isCollapsed && (
                    <span className={`font-medium text-sm tracking-wide ${
                      location.pathname === item.path ? 'text-yellow-400' : ''
                    }`}>{item.text}</span>
                  )}
                </div>
                {!isCollapsed && (
                  <FaChevronRight 
                    size={14} 
                    className={`ml-auto mr-4 ${location.pathname === item.path ? 'text-yellow-400' : 'text-white'}`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <MobileMenu />
      <DesktopMenu />
    </>
  );
};

export default Menu;
