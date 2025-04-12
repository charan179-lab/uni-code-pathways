
import { User, Course, CodingProblem, UserStats } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    role: 'faculty',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@university.edu',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User',
  },
];

export const mockCourses: Course[] = [
  {
    id: '101',
    title: 'Introduction to Computer Science',
    description: 'Fundamental concepts of computer science and programming.',
    instructor: 'Dr. Jane Smith',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    enrolledCount: 120,
    modules: [
      {
        id: 'm1',
        title: 'Course Introduction',
        description: 'Overview of the course structure and expectations.',
        type: 'lecture',
        content: 'Welcome to Introduction to Computer Science!',
      },
      {
        id: 'm2',
        title: 'Basic Programming Concepts',
        description: 'Learn about variables, data types, and control structures.',
        type: 'lecture',
      },
      {
        id: 'm3',
        title: 'First Coding Assignment',
        description: 'Implement a simple calculator program.',
        type: 'coding',
        dueDate: new Date('2025-05-01'),
      },
    ],
  },
  {
    id: '102',
    title: 'Data Structures and Algorithms',
    description: 'Essential data structures and algorithm design techniques.',
    instructor: 'Prof. Robert Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
    enrolledCount: 85,
    modules: [
      {
        id: 'm1',
        title: 'Arrays and Linked Lists',
        description: 'Understanding basic data structures.',
        type: 'lecture',
      },
      {
        id: 'm2',
        title: 'Sorting Algorithms',
        description: 'Implementation and analysis of sorting algorithms.',
        type: 'lecture',
      },
      {
        id: 'm3',
        title: 'Weekly Quiz',
        description: 'Test your understanding of arrays and sorting algorithms.',
        type: 'quiz',
        dueDate: new Date('2025-04-20'),
      },
    ],
  },
  {
    id: '103',
    title: 'Web Development',
    description: 'Learn HTML, CSS, and JavaScript to build modern web applications.',
    instructor: 'Prof. Sarah Williams',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    enrolledCount: 150,
    modules: [
      {
        id: 'm1',
        title: 'HTML Basics',
        description: 'Understanding HTML document structure and elements.',
        type: 'lecture',
      },
      {
        id: 'm2',
        title: 'CSS Styling',
        description: 'Applying styles to HTML elements.',
        type: 'lecture',
      },
      {
        id: 'm3',
        title: 'Personal Portfolio Project',
        description: 'Create your own portfolio website.',
        type: 'assignment',
        dueDate: new Date('2025-05-10'),
      },
    ],
  },
];

export const mockCodingProblems: CodingProblem[] = [
  {
    id: 'p1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    category: ['arrays', 'hash-table'],
    starterCode: {
      javascript: 'function twoSum(nums, target) {\n  // Write your code here\n}',
      python: 'def two_sum(nums, target):\n    # Write your code here\n    pass',
      java: 'class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    // Write your code here\n  }\n}',
    },
    testCases: [
      {
        id: 't1',
        input: '[2,7,11,15], 9',
        expectedOutput: '[0,1]',
      },
      {
        id: 't2',
        input: '[3,2,4], 6',
        expectedOutput: '[1,2]',
      },
    ],
  },
  {
    id: 'p2',
    title: 'Reverse String',
    description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
    difficulty: 'easy',
    category: ['strings', 'two-pointers'],
    starterCode: {
      javascript: 'function reverseString(s) {\n  // Write your code here\n}',
      python: 'def reverse_string(s):\n    # Write your code here\n    pass',
      java: 'class Solution {\n  public void reverseString(char[] s) {\n    // Write your code here\n  }\n}',
    },
    testCases: [
      {
        id: 't1',
        input: '["h","e","l","l","o"]',
        expectedOutput: '["o","l","l","e","h"]',
      },
      {
        id: 't2',
        input: '["H","a","n","n","a","h"]',
        expectedOutput: '["h","a","n","n","a","H"]',
      },
    ],
  },
  {
    id: 'p3',
    title: 'Merge Sorted Arrays',
    description: 'Merge two sorted arrays into a single sorted array.',
    difficulty: 'medium',
    category: ['arrays', 'sorting', 'two-pointers'],
    starterCode: {
      javascript: 'function merge(nums1, m, nums2, n) {\n  // Write your code here\n}',
      python: 'def merge(nums1, m, nums2, n):\n    # Write your code here\n    pass',
      java: 'class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n    // Write your code here\n  }\n}',
    },
    testCases: [
      {
        id: 't1',
        input: '[1,2,3,0,0,0], 3, [2,5,6], 3',
        expectedOutput: '[1,2,2,3,5,6]',
      },
    ],
  },
];

export const mockUserStats: UserStats[] = [
  {
    userId: '1',
    solvedProblems: 15,
    totalAttempts: 25,
    streak: 3,
    skillLevels: {
      'problem-solving': 70,
      'data-structures': 65,
      'algorithms': 60,
      'time-complexity': 55,
    },
  },
];

export const currentUser = mockUsers[0]; // Default to first user (student)
