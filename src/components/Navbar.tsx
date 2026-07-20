import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">JobPortal</span>
            <span className="text-gray-500 hidden sm:inline">
              | Find Your Dream Job
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/jobs"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Browse Jobs
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === "user" ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-gray-700 hover:text-primary"
                    >
                      My Dashboard
                    </Link>
                    <Link
                      to="/applications"
                      className="text-gray-700 hover:text-primary"
                    >
                      My Applications
                    </Link>
                    <Link
                      to="/saved-jobs"
                      className="text-gray-700 hover:text-primary"
                    >
                      Saved Jobs
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/employer/dashboard"
                      className="text-gray-700 hover:text-primary"
                    >
                      Company Dashboard
                    </Link>
                    <Link
                      to="/post-job"
                      className="text-gray-700 hover:text-primary"
                    >
                      Post a Job
                    </Link>
                  </>
                )}

                <div className="flex items-center space-x-4">
                  <span className="text-primary font-medium">
                    Hello, {user?.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary hover:bg-primary-light rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button className="text-gray-500 hover:text-primary">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
