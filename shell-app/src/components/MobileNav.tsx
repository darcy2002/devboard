import { NavLink } from 'react-router-dom';

const MobileNav = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <div className="flex">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${
              isActive ? 'text-indigo-600' : 'text-gray-500'
            }`
          }
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Dashboard
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${
              isActive ? 'text-indigo-600' : 'text-gray-500'
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
