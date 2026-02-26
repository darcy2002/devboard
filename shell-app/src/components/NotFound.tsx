import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] p-8">
      <h1 className="text-6xl font-bold text-gray-200 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Page not found</h2>
      <p className="text-sm text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link
        to="/dashboard"
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:shadow-md active:scale-[0.98] transition-all duration-200"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
