interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/60">
      <div className="flex items-center justify-between px-4 sm:px-6 h-14">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="shell-btn-tap sm:hidden p-2 -ml-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Logo only visible on mobile (desktop shows it in sidebar) */}
          <div className="sm:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <span className="text-base font-bold text-gray-900">DevBoard</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
            aria-label="Profile"
          >
            D
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
