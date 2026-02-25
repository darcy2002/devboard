const MFELoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-10 w-10 border-3 border-indigo-600 border-t-transparent mb-4" />
      <p className="text-sm text-gray-500">Loading module...</p>
    </div>
  );
};

export default MFELoader;
