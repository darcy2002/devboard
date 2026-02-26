import { NavLink } from 'react-router-dom';

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: '/tasks',
    label: 'Tasks',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {/* Logo area */}
      <div className="px-5 pt-5 pb-3 shell-hide-on-mobile">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">DevBoard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <p className="px-3 pt-2 pb-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Menu</p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `shell-nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium ${
                isActive
                  ? 'active bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200/70 shrink-0">
        <p className="text-[11px] text-gray-400">DevBoard v1.1.0</p>
        {import.meta.env.DEV && (
          <p className="text-[10px] text-emerald-500 font-medium mt-0.5">● Live dev</p>
        )}
      </div>
    </>
  );
}

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ open = false, onClose }: SidebarProps) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="shell-desktop-sidebar flex-col w-[220px] min-w-[220px] flex-shrink-0 border-r border-gray-200/60 bg-[#f8f9fb] min-h-0"
        aria-label="Main navigation"
      >
        <SidebarNav />
      </aside>

      {/* Mobile drawer */}
      <aside
        className={`shell-mobile-sidebar flex flex-col w-[260px] flex-shrink-0 border-r border-gray-200/60 bg-[#f8f9fb] min-h-0 fixed inset-y-0 left-0 z-40 pt-14 transform transition-transform duration-300 ease-out shadow-2xl ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        <SidebarNav onNavigate={onClose} />
      </aside>
    </>
  );
};

export default Sidebar;
