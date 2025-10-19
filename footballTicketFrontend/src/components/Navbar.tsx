import { Link, useNavigate } from "react-router-dom";
import { isLoginedIn, logout } from "../service/AuthService";

export default function Navbar() {
  const isLogin = isLoginedIn();
  const navigator = useNavigate();

  const handleLogout = () => {
    logout();
    navigator("/login");
    window.location.reload();
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 px-8 py-3">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-white font-bold text-lg">
          FootyTickets
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-white/80 hover:text-white text-sm transition-colors"
          >
            Home
          </Link>
          <Link
            to="/matches"
            className="text-white/80 hover:text-white text-sm transition-colors"
          >
            Matches
          </Link>
          {!isLogin ? (
            <>
              <Link
                to="/login"
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Create Account
              </Link>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}
