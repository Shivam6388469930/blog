"use client"
import React from 'react';

export default function AdminFooter() {
    return (
      <footer className="w-full bg-gray-100 border-t mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
          <p>© {new Date().getFullYear()} ByteCode Admin Dashboard. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="/admin/support" className="hover:text-blue-600 transition">Support</a>
            <a href="/admin/terms" className="hover:text-blue-600 transition">Terms</a>
            <a href="/admin/privacy" className="hover:text-blue-600 transition">Privacy</a>
          </div>
        </div>
      </footer>
    );
  }
  