"use client";

import React from 'react';
import Navbar from '../component/Navbars';
import Footer from '../component/Footer';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Main Content */}
      <main className="flex-1">
        <Navbar/>
        {children} {/* Page-specific content will be rendered here */}
        <Footer/>
      </main>

    </div>
  );
};

export default AdminLayout;
