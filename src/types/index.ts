export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  popularity: number;
}

export interface Resource {
  title: string;
  type: 'course' | 'video' | 'article' | 'documentation' | 'practice';
  url: string;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Phase {
  id: string;
  title: string;
  duration: number; // in weeks
  skills: string[];
  resources: Resource[];
  project: string;
  completed: boolean;
  completedAt?: Date;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: number; // in months
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  phases: Phase[];
  progress: number; // percentage
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  pathId: string;
  completedPhases: string[];
  totalProgress: number;
  lastActivity: Date;
}