
// User-related types
export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Course-related types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail?: string;
  enrolledCount: number;
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  type: 'lecture' | 'assignment' | 'quiz' | 'coding';
  content?: string;
  dueDate?: Date;
  completed?: boolean;
}

// Coding-related types
export interface CodingProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string[];
  starterCode: Record<string, string>;
  testCases: TestCase[];
  solutions?: Record<string, string>;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface CodingSubmission {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: string;
  status: 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'runtime_error' | 'pending';
  runtime?: number;
  memory?: number;
  submittedAt: Date;
}

// Analytics-related types
export interface ProgressData {
  completed: number;
  total: number;
  percentage: number;
}

export interface UserStats {
  userId: string;
  solvedProblems: number;
  totalAttempts: number;
  streak: number;
  skillLevels: Record<string, number>;
}
