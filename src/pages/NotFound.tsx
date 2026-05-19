import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
      <h1 className="text-7xl font-bold text-[#1e3a8a]">404</h1>
      <p className="text-xl text-gray-600">Page not found</p>
      <p className="text-sm text-gray-400">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-2 rounded-lg bg-[#1e3a8a] px-6 py-2 text-white hover:bg-[#162e5a]"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
