import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { mockPositions, Position } from "../data/mockdata";
import { useAuth } from "../context/AuthContext";

const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  const { isAuthenticated } = useAuth();

  // Get unique categories and locations for filters
  const categories = useMemo(() => {
    const cats = new Set(mockPositions.map((p) => p.category_display));
    return ["all", ...Array.from(cats)];
  }, []);

  const locations = useMemo(() => {
    const locs = new Set(mockPositions.map((p) => p.location));
    return ["all", ...Array.from(locs)];
  }, []);

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return mockPositions.filter((job) => {
      // Only show active jobs
      if (!job.is_active) return false;

      // Search filter
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "all" || job.category_display === selectedCategory;

      // Location filter
      const matchesLocation =
        selectedLocation === "all" || job.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [searchTerm, selectedCategory, selectedLocation]);

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 mt-2">
            Discover opportunities that match your skills
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by job title, company, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
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
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "all" ? "All Locations" : loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found{" "}
            <span className="font-semibold text-primary">
              {filteredJobs.length}
            </span>{" "}
            jobs
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} isAuthenticated={isAuthenticated} />
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700">
              No jobs found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Job Card Component - separate component for each job listing
const JobCard: React.FC<{ job: Position; isAuthenticated: boolean }> = ({
  job,
  isAuthenticated,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-5">
        {/* Company & Title */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 hover:text-primary">
              <Link to={`/jobs/${job.id}`}>{job.title}</Link>
            </h3>
            <p className="text-primary font-medium mt-1">{job.company}</p>
          </div>
          {job.img && (
            <img
              src={job.img}
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
        </div>

        {/* Location & Type */}
        <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>{job.needed_workforce - job.met_workforce} openings</span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="text-gray-600 text-sm mt-3 line-clamp-2">
          {job.description.substring(0, 100)}...
        </p>

        {/* Skills/Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-2 py-1 bg-primary-light text-primary-dark text-xs rounded-full">
            {job.category_display}
          </span>
          {job.remained > 0 && job.remained < 5 && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Urgent Hiring
            </span>
          )}
        </div>

        {/* Action Button */}
        <Link
          to={`/jobs/${job.id}`}
          className="mt-4 block w-full text-center bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobsPage;
