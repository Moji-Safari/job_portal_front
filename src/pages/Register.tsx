import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockUsers } from "../data/mockdata";

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: "user" | "admin";

  employeeName?: string;
  employeeEducation?: "1" | "2" | "3" | "4";
  employeeCategory?: "health" | "tech" | "eng" | "finance" | "entertnmt";

  companyName?: string;
  companyField?: "health" | "tech" | "eng" | "finance" | "entertnmt";
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "user",

    employeeEducation: "2",
    employeeCategory: "tech",

    companyField: "tech",
  });

  const [step, setStep] = useState<"account" | "profile">("account");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateAccountStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (
      mockUsers.some(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase(),
      )
    ) {
      newErrors.email = "This email is already registered";
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (
      mockUsers.some(
        (u) => u.username.toLowerCase() === formData.username.toLowerCase(),
      )
    ) {
      newErrors.username = "This username is already taken";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProfileStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.role === "user") {
      if (!formData.employeeName) {
        newErrors.employeeName = "Full name is required";
      }
    } else {
      if (!formData.companyName) {
        newErrors.companyName = "Company name is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateAccountStep()) {
      setStep("profile");
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep("account");
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateProfileStep()) {
      return;
    }

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Registration data:", formData);

    const newUserId = mockUsers.length + 1;
    const newUser = {
      id: newUserId,
      email: formData.email,
      username: formData.username,
      role: formData.role,
    };

    localStorage.setItem(
      "pendingRegistration",
      JSON.stringify({
        user: newUser,
        profile:
          formData.role === "user"
            ? {
                name: formData.employeeName,
                education: formData.employeeEducation,
                category: formData.employeeCategory,
              }
            : { company: formData.companyName, field: formData.companyField },
      }),
    );

    setRegistrationSuccess(true);

    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/");
    }, 1500);
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            Welcome to JobPortal! You're being redirected...
          </p>
          <div className="animate-pulse">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Create an Account</h1>
          <p className="text-gray-600 mt-2">
            Join JobPortal to find your dream job or hire top talent
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === "account"
                  ? "bg-primary text-white"
                  : "bg-primary-light text-primary"
              }`}
            >
              1
            </div>
            <div
              className={`w-16 h-0.5 ${step === "profile" ? "bg-primary" : "bg-gray-300"}`}
            ></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === "profile"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {step === "account" && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Account Information
                </h2>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="johndoe"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    This will be your public display name
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    I want to *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, role: "user" }))
                      }
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        formData.role === "user"
                          ? "border-primary bg-primary-light"
                          : "border-gray-200 hover:border-primary"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="font-semibold">Job Seeker</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Find and apply for jobs
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, role: "admin" }))
                      }
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        formData.role === "admin"
                          ? "border-primary bg-primary-light"
                          : "border-gray-200 hover:border-primary"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <span className="font-semibold">Employer</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Post jobs and hire talent
                      </p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Create a password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    Minimum 6 characters
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === "profile" && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {formData.role === "user"
                    ? "Tell us about yourself"
                    : "Company Information"}
                </h2>

                {formData.role === "user" ? (
                  <>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="employeeName"
                        value={formData.employeeName || ""}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.employeeName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.employeeName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.employeeName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Highest Education
                      </label>
                      <select
                        name="employeeEducation"
                        value={formData.employeeEducation}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="1">No degree</option>
                        <option value="2">Bachelor's Degree</option>
                        <option value="3">Master's Degree</option>
                        <option value="4">PhD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Professional Field
                      </label>
                      <select
                        name="employeeCategory"
                        value={formData.employeeCategory}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="tech">Technology</option>
                        <option value="health">Healthcare</option>
                        <option value="eng">Engineering</option>
                        <option value="finance">Finance</option>
                        <option value="entertnmt">Entertainment</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName || ""}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.companyName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Your Company Inc."
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.companyName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Industry *
                      </label>
                      <select
                        name="companyField"
                        value={formData.companyField}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="tech">Technology</option>
                        <option value="health">Healthcare</option>
                        <option value="eng">Engineering</option>
                        <option value="finance">Finance</option>
                        <option value="entertnmt">Entertainment</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="bg-primary-light rounded-lg p-4 mt-4">
                  <p className="text-primary-dark text-sm">
                    <strong>💡 Note:</strong> You can complete your full profile
                    (bio, skills, profile picture, etc.) after registration.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {step === "profile" && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}

              {step === "account" ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Next: Profile Info →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              )}
            </div>
          </form>

          <p className="text-center text-gray-600 mt-6 pt-4 border-t">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
