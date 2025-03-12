export const ErrorComponent = ({ message }: { message?: string }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="h-24 w-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="h-12 w-12 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v5h-2zm0 6h2v2h-2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
        <p className="text-gray-600">
          {message || "Something went wrong. Please try again later."}
        </p>
      </div>
    </div>
  );
};
