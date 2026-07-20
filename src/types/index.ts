export interface User {
  id: number;
  email: string;
  username: string;
  role: "admin" | "user";
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  password2: string;
  role: "admin" | "user";
}

// ==========================================
// EMPLOYEE PROFILE TYPES (Job Seekers)

export interface Skill {
  id: number;
  title: string;
  related: string;
  experience: number;
}

export interface EmployeeProfile {
  id: string;
  pic: string | null;
  name: string;
  education: 1 | 2 | 3 | 4;
  education_display: "No degree" | "Bachelor" | "Master" | "PHD";
  profession_category: "health" | "tech" | "eng" | "finance" | "entertnmt";
  profession_category_display: string;
  skill: number[];
  skill_details: Skill[];
  bio: string;
  email: string;
  accepted: number;
  rejected: number;
  applied_positions: string[];
}

export interface Employee {
  id: string;
  user: number;
  user_email: string;
  user_username: string;
  profile: string;
  profile_details: EmployeeProfile | null;
  is_verified: boolean;
  created_at: string;
  total_applications?: number;
  accepted_applications?: number;
  pending_applications?: number;
  rejected_applications?: number;
  saved_jobs_count?: number;
}

// ==========================================
// EMPLOYER PROFILE TYPES (Companies)

export interface EmployerProfile {
  id: string;
  pic: string | null;
  name: string;
  field: "health" | "tech" | "eng" | "finance" | "entertnmt";
  field_display: string;
  bio: string;
  company: string;
  email: string;
}

export interface Employer {
  id: string;
  user: number;
  user_email: string;
  user_username: string;
  emplyr_pro: string;
  profile_details: EmployerProfile | null;
  offered_positions: string[];
  total_positions: number;
  total_applications?: number;
  active_positions?: number;
  pending_applications?: number;
  accepted_applications?: number;
  rejected_applications?: number;
}

// JOB POSITION TYPES
// ==========================================

export interface Position {
  id: string;
  img: string | null;
  employer_detail: string;
  employer_name: string;
  company: string;
  title: string;
  category: "health" | "tech" | "eng" | "finance" | "entertnmt";
  category_display: string;
  description: string;
  requirements: string;
  location: string;
  needed_workforce: number;
  met_workforce: number;
  remained: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deadline: string | null;
  total_applications?: number;
}

// ==========================================
// APPLICATION TYPES

export interface Application {
  id: string;
  employee: string;
  employee_name: string;
  employee_email: string;
  position: string;
  position_title: string;
  employer_detail: string;
  company_name: string;
  applied_at: string;
  status: 1 | 2 | 3;
  status_display: "Pending" | "Accepted" | "Rejected";
  updated_at: string;
}

// ==========================================
// SAVED JOB TYPES

export interface SavedJob {
  id: string;
  user: number;
  user_email: string;
  saved_position: string;
  saved_position_details: Position;
  saved_date: string;
  notes: string | null;
  reminder: string | null;
}

// ==========================================
// DASHBOARD TYPES

export interface EmployeeDashboard {
  id: string;
  user: number;
  user_email: string;
  user_username: string;
  profile: string;
  profile_details: EmployeeProfile;
  is_verified: boolean;
  created_at: string;
  total_applications: number;
  accepted_applications: number;
  pending_applications: number;
  rejected_applications: number;
  saved_jobs_count: number;
}

export interface EmployerDashboard {
  id: string;
  user: number;
  user_email: string;
  user_username: string;
  emplyr_pro: string;
  profile_details: EmployerProfile;
  offered_positions: string[];
  total_positions: number;
  total_applications: number;
  active_positions: number;
  pending_applications: number;
  accepted_applications: number;
  rejected_applications: number;
}

// ==========================================
// FILTER TYPES

export interface JobFilters {
  search?: string;
  category?: string;
  location?: string;
  minSalary?: number;
  maxSalary?: number;
}

export interface ApplicationFilters {
  status?: "pending" | "accepted" | "rejected";
  dateFrom?: string;
  dateTo?: string;
}
