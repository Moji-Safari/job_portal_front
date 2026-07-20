import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  mockPositions,
  mockApplications,
  mockSavedJobs,
} from "../data/mockdata";
import { useAuth } from "../context/AuthContext";

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);

  const job = mockPositions.find((p) => p.id === id);

  const hasApplied =
    isAuthenticated &&
    user &&
    mockApplications.some(
      (app) => app.employee === `emp-00${user.id}` && app.position === id,
    );

  const isSaved =
    isAuthenticated &&
    user &&
    mockSavedJobs.some(
      (saved) => saved.user === user.id && saved.saved_position === id,
    );

  if (!job) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">Job not found</h1>
          <Link to="/jobs" className="text-primary hover:underline mt-2 block">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/jobs/${id}` } });
      return;
    }

    if (user?.role !== "user") {
      alert(
        "Only job seekers can apply for positions. Please register as an employee.",
      );
      return;
    }

    setShowApplyModal(true);
  };

  const handleConfirmApply = () => {
    setApplicationSent(true);
    setShowApplyModal(false);

    setTimeout(() => {
      setApplicationSent(false);
    }, 3000);
  };

  const handleSaveJob = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    alert("Job saved! (This would save to backend in a real app)");
  };

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <Link
          to="/jobs"
          className="inline-flex items-center text-primary hover:underline mb-4"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to all jobs
        </Link>

        {applicationSent && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            ✅ Application submitted successfully! The employer will review your
            application.
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-primary px-6 py-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-white">{job.title}</h1>
                <p className="text-primary-light mt-1">{job.company}</p>
              </div>
              {job.img && (
                <img
                  src={job.img}
                  alt={job.company}
                  className="w-16 h-16 rounded-lg object-cover border-2 border-white"
                />
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
              <div>
                <p className="text-gray-500 text-sm">📍 Location</p>
                <p className="font-medium">{job.location}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm"> Posted</p>
                <p className="font-medium">
                  {new Date(job.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm"> Openings</p>
                <p className="font-medium">{job.remained} positions left</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm"> Deadline</p>
                <p className="font-medium">
                  {job.deadline
                    ? new Date(job.deadline).toLocaleDateString()
                    : "Not specified"}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Job Description
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {job.description}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Requirements
              </h2>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-gray-600 whitespace-pre-line">
                  {job.requirements}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary-light text-primary-dark rounded-full text-sm">
                {job.category_display}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t">
              <button
                onClick={handleApply}
                disabled={hasApplied || !job.is_active}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  hasApplied
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : !job.is_active
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                {hasApplied
                  ? "Already Applied"
                  : job.is_active
                    ? "Apply Now"
                    : "Position Closed"}
              </button>

              <button
                onClick={handleSaveJob}
                className={`px-6 py-2 rounded-lg font-medium transition-colors border ${
                  isSaved
                    ? "bg-primary-light text-primary border-primary"
                    : "border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                }`}
              >
                {isSaved ? "★ Saved" : "☆ Save Job"}
              </button>
            </div>

            
            {job.total_applications && (
              <p className="text-sm text-gray-500 mt-4">
                 {job.total_applications} people have applied for this
                position
              </p>
            )}
          </div>
        </div>
      </div>

      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Application
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to apply for <strong>{job.title}</strong> at{" "}
              <strong>{job.company}</strong>?
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-yellow-800 text-sm">
                ⚠️ Make sure your profile is up to date before applying!
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmApply}
                className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
              >
                Confirm Apply
              </button>
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;
