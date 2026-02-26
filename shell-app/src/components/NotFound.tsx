import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
        <span className="text-3xl font-bold text-gray-300">404</span>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Page not found</h2>
      <p className="text-sm text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
      <Link
        to="/dashboard"
        className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 active:scale-[0.97] transition-all duration-200 shadow-sm"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
