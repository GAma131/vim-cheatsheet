const ErrorMessage = ({ error, onRetry }) => (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-800">
      <div className="text-center max-w-lg p-6 rounded-lg bg-gray-800 shadow-lg">
        <h3 className="text-red-400 font-bold text-xl mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-300 mb-4">We encountered an error while loading the data.</p>
        <p className="text-red-500 italic text-sm mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
        >
          Retry
        </button>
      </div>
    </div>
  );

  export default ErrorMessage;
