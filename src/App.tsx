import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import Register from "./pages/Register";


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};


const EmployeeRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "user") {
    return <Navigate to="/employer/dashboard" replace />;
  }

  return <>{children}</>;
};


const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Dream Job Today</h1>
          <p className="text-xl mb-8 opacity-90">
            Connect with top employers and advance your career
          </p>
          {!isAuthenticated && (
            <div className="flex justify-center gap-4">
              <a
                href="/login"
                className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Get Started
              </a>
              <a
                href="/jobs"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
              >
                Browse Jobs
              </a>
            </div>
          )}
          {isAuthenticated && (
            <a
              href="/jobs"
              className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Browse Jobs →
            </a>
          )}
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose JobPortal?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Search Jobs</h3>
            <p className="text-gray-600">
              Find thousands of job opportunities from top companies
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Apply</h3>
            <p className="text-gray-600">
              Apply to jobs with just one click using your profile
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your applications and get updates in real-time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-secondary">
          <Navbar />
          <Routes>
           
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />

            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div className="p-8 text-center">
                    Employee Dashboard (Coming Soon)
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/applications"
              element={
                <EmployeeRoute>
                  <div className="p-8 text-center">
                    My Applications (Coming Soon)
                  </div>
                </EmployeeRoute>
              }
            />

            <Route
              path="/saved-jobs"
              element={
                <EmployeeRoute>
                  <div className="p-8 text-center">
                    Saved Jobs (Coming Soon)
                  </div>
                </EmployeeRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
