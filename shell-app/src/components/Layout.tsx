import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-3.5rem)] pb-16 lg:pb-0">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
};

export default Layout;
