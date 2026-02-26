import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#f0f2f5]">
      {/* Navbar: only visible on mobile */}
      <div className="sm:hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
      </div>

      <div className="flex flex-1 min-h-0 relative">
        {/* Mobile sidebar backdrop */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300 sm:hidden"
          style={{ opacity: sidebarOpen ? 1 : 0, pointerEvents: sidebarOpen ? 'auto' : 'none' }}
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />

        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content: rounded container on desktop like the reference */}
        <main className="flex-1 min-h-0 overflow-hidden flex flex-col pb-20 sm:pb-0 w-full min-w-0 sm:p-3">
          <div className="h-full min-h-0 flex flex-col w-full sm:bg-white sm:rounded-2xl sm:shadow-sm sm:border sm:border-gray-200/50 overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
};

export default Layout;
