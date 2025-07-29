const ErrorState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center py-16">
    <div className="text-center text-lg text-red-500">
      Error loading Profile: {message}
    </div>
  </div>
);

export default ErrorState;
