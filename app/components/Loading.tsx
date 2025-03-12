export const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="h-24 w-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
          <svg
            className="h-12 w-12 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2a10 10 0 1 1-10 10A10 10 0 0 1 12 2m0-2C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
        <p className="text-gray-600">Please wait while we load the content.</p>
      </div>
    </div>
  );
};
