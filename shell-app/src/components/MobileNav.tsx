import { NavLink } from 'react-router-dom';

const MobileNav = () => {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/60 z-30 pb-[env(safe-area-inset-bottom)]">
      <div className="flex max-w-screen-xl mx-auto">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-all duration-200 ease-out active:scale-90 ${
              isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`
          }
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive => isActive ? 2.5 : 1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-all duration-200 ease-out active:scale-90 ${
              isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`
          }
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Tasks
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileNav;
