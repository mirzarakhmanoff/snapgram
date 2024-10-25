import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl mt-4 text-white">The page is under development</p>
      <Link to="/" className="mt-6 text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default Error;
