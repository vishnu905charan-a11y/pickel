import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { ToastContainer } from '../components/common/ToastContainer';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FDFBF7] text-pickle-dark font-sans">
      <AdminSidebar />
      <div className="grow flex flex-col min-w-0 overflow-y-auto">
        <main className="grow p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};
