import React from 'react';
import Navbar from './Navbar';
import Menu from './FacultyMenu';
import { Outlet } from 'react-router-dom';

function FacultyLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden pt-16">
          <Menu />
        <div className="flex-1 p-4 bg-gray-100 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default FacultyLayout;
