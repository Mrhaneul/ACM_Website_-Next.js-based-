// src/types/dashboard.ts

export interface UserProfile {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'leader' | 'member';
    major: string;
    graduationYear: string;
    bio: string;
    skills: string[];
    githubUsername: string;
    linkedinUrl: string;
    profileImage: string;
    courses: Course[];
    commits: number;
    joinDate: string;
    githubConnected?: boolean;
    settings: UserSettings;
  }
  
  export interface Course {
    code: string;        // e.g., "EGR101", "MAT245", "CSC312"
    title: string;       // e.g., "Engineering from a Christian Worldview"
    semester: string;    // e.g., "Fall", "Spring", "Summer"
    year: string;        // e.g., "2023", "2024"
  }
  
  export interface UserSettings {
    emailUpdates: boolean;
    profileVisible: boolean;
    showCommits: boolean;
    showEmail: boolean;
    showCourses: boolean;
    projectInvites: boolean;
    weeklyDigest: boolean;
    commitReminders: boolean;
  }
  
  export interface Project {
    id?: string;
    title: string;
    description: string;
    status: 'planning' | 'active' | 'completed';
    isPublic: boolean;
    githubRepo: string;
    createdBy: string;
    createdAt: string;
    lastUpdated: string;
    invitedMembers: string[];
    passwords: ProjectPassword[];
    documents: ProjectDocument[];
  }
  
  export interface ProjectPassword {
    title: string;
    description?: string;
    username: string;
    password: string;
    url?: string;
    notes?: string;
  }
  
  export interface ProjectDocument {
    name: string;
    url: string;
    uploadedBy: string;
    uploadedAt: string;
    size?: number;
    type?: string;
  }
  
  export interface LeaderboardEntry {
    id: string;
    uid: string;
    firstName: string;
    lastName: string;
    role: string;
    major?: string;
    commits: number;
    profileImage?: string;
    githubUsername?: string;
  }
  
  // Utility types for form handling
  export type UserRole = 'admin' | 'leader' | 'member';
  export type ProjectStatus = 'planning' | 'active' | 'completed';
  export type DashboardView = 'profile' | 'projects' | 'leaderboard' | 'transcript' | 'passwords' | 'settings';