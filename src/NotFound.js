function NotFound() {
  return (
    // empty();
    <div className="flex flex-col justify-center items-center">
        <h1 className="text-8xl font-bold text-center mt-8">404 Not Found</h1>
        <p className="text-center mt-5 text-xl text-gray-600">The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;