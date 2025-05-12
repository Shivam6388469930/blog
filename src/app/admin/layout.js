"use client";

import React from 'react';
import Navbar from '../component/Navbars';
import Footer from '../component/Footer';
import AdminNavbar from '../component/AdminNavbar';
import AdminFooter from '../component/AdminFooter';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Main Content */}
      <main className="flex-1">
       <AdminNavbar/>
        {children} {/* Page-specific content will be rendered here */}
       <AdminFooter/>
      </main>

    </div>
  );
};

export default AdminLayout;
