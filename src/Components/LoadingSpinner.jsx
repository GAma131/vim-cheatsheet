const LoadingSpinner = ({ message }) => (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-400 border-opacity-75" />
        <p className="text-green-300 font-semibold mt-4 text-lg">{message}</p>
        <p className="text-gray-400 mt-2 text-sm">Please wait while we fetch the data.</p>
      </div>
    </div>
  );

  export default LoadingSpinner;
 