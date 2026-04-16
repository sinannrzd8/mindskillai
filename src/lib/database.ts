// Mock database for development - replace with real database in production
export interface User {
  id: string;
  email: string;
  password: string; // In production, this would be hashed
  fullName: string;
  role: 'student' | 'teacher' | 'admin';
  courseId?: string; // For students assigned to specific courses
  bio?: string;
  skills?: string[];
  createdAt: Date;
  isActive: boolean;
}

export type SessionStatus = 'pending' | 'approved' | 'completed' | 'cancelled';

export interface Session {
  id: string;
  studentId: string;
  teacherId: string;
  topic: string;
  scheduledDate: Date;
  duration: number;
  status: SessionStatus;
  notes?: string;
  meetingLink?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface Review {
  id: string;
  sessionId: string;
  reviewerId: string;
  reviewerRole: 'student' | 'teacher';
  targetId: string;
  targetRole: 'teacher' | 'student';
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface RatingSummary {
  averageRating: number;
  reviewCount: number;
  recentReviews: Review[];
}

// Predefined course-based credentials for students
const predefinedCredentials = [
  // Course 1 - Web Development
  { email: 'student1@webdev.mindskill.ai', password: 'webdev2024', courseId: 'web-dev-101', role: 'student' as const, bio: 'Aspiring frontend developer focused on modern UI design.', skills: ['React', 'TypeScript', 'Tailwind'] },
  { email: 'student2@webdev.mindskill.ai', password: 'webdev2024', courseId: 'web-dev-101', role: 'student' as const, bio: 'Learning full-stack development with mentorship support.', skills: ['HTML', 'CSS', 'JavaScript'] },
  { email: 'student3@webdev.mindskill.ai', password: 'webdev2024', courseId: 'web-dev-101', role: 'student' as const, bio: 'Building portfolio projects and career-forward skills.', skills: ['UI/UX', 'Next.js'] },

  // Course 2 - Data Science
  { email: 'student1@datasci.mindskill.ai', password: 'datasci2024', courseId: 'data-sci-101', role: 'student' as const, bio: 'Data science student exploring machine learning workflows.', skills: ['Python', 'Pandas', 'Visualization'] },
  { email: 'student2@datasci.mindskill.ai', password: 'datasci2024', courseId: 'data-sci-101', role: 'student' as const, bio: 'Focused on analytics and decision intelligence.', skills: ['SQL', 'Statistics'] },

  // Course 3 - AI/ML
  { email: 'student1@ai.mindskill.ai', password: 'ai2024', courseId: 'ai-ml-101', role: 'student' as const, bio: 'Passionate about applied machine learning and generative AI.', skills: ['TensorFlow', 'PyTorch'] },
  { email: 'student2@ai.mindskill.ai', password: 'ai2024', courseId: 'ai-ml-101', role: 'student' as const, bio: 'Building models for real-world AI applications.', skills: ['NLP', 'Computer Vision'] },

  // Teachers
  { email: 'teacher1@mindskill.ai', password: 'teacher2024', role: 'teacher' as const, bio: 'Senior mentor specializing in product-led development and career planning.', skills: ['Mentorship', 'Career Coaching'] },
  { email: 'teacher2@mindskill.ai', password: 'teacher2024', role: 'teacher' as const, bio: 'AI instructor with experience operating cross-functional teams.', skills: ['AI/ML', 'Data Strategy'] },

  // Admins/Course Controllers
  { email: 'admin@mindskill.ai', password: 'admin2024', role: 'admin' as const, bio: 'Platform administrator managing operations and growth.', skills: ['Program Management'] },
  { email: 'controller@mindskill.ai', password: 'controller2024', role: 'admin' as const, bio: 'Curriculum controller overseeing course quality.', skills: ['Quality Assurance'] },
];

// Mock database - in production, this would be a real database
class MockDatabase {
  private users: User[] = [];
  private sessions: Session[] = [];
  private reviews: Review[] = [];
  private nextId = 1;

  constructor() {
    this.initializePredefinedUsers();
    this.initializePredefinedSessions();
    this.initializePredefinedReviews();
  }

  private initializePredefinedUsers() {
    predefinedCredentials.forEach(cred => {
      const user: User = {
        id: `user_${this.nextId++}`,
        email: cred.email,
        password: cred.password,
        fullName: this.generateFullName(cred.email),
        role: cred.role,
        courseId: cred.courseId,
        bio: cred.bio,
        skills: cred.skills,
        createdAt: new Date(),
        isActive: true
      };
      this.users.push(user);
    });
  }

  private generateFullName(email: string): string {
    const name = email.split('@')[0];
    if (name.startsWith('student')) {
      return `Student ${name.replace('student', '')}`;
    }
    if (name.startsWith('teacher')) {
      return `Teacher ${name.replace('teacher', '')}`;
    }
    if (name === 'admin') return 'Administrator';
    if (name === 'controller') return 'Course Controller';
    return name;
  }

  private initializePredefinedSessions() {
    const teacher1 = this.users.find(user => user.email === 'teacher1@mindskill.ai');
    const teacher2 = this.users.find(user => user.email === 'teacher2@mindskill.ai');
    const student1 = this.users.find(user => user.email === 'student1@webdev.mindskill.ai');
    const student2 = this.users.find(user => user.email === 'student2@webdev.mindskill.ai');
    const student3 = this.users.find(user => user.email === 'student3@webdev.mindskill.ai');

    if (teacher1 && student1) {
      this.sessions.push({
        id: `session_${this.nextId++}`,
        studentId: student1.id,
        teacherId: teacher1.id,
        topic: 'Career Guidance Session',
        scheduledDate: new Date(Date.now() - 86400000),
        duration: 30,
        status: 'completed',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        createdAt: new Date(Date.now() - 86400000 * 2),
        completedAt: new Date(Date.now() - 86400000)
      });
      this.sessions.push({
        id: `session_${this.nextId++}`,
        studentId: student1.id,
        teacherId: teacher1.id,
        topic: 'Portfolio Review',
        scheduledDate: new Date(Date.now() + 86400000),
        duration: 45,
        status: 'approved',
        meetingLink: 'https://meet.google.com/xyz-1234-abc',
        createdAt: new Date()
      });
    }

    if (teacher1 && student2) {
      this.sessions.push({
        id: `session_${this.nextId++}`,
        studentId: student2.id,
        teacherId: teacher1.id,
        topic: 'Project Roadmap',
        scheduledDate: new Date(Date.now() + 172800000),
        duration: 60,
        status: 'pending',
        createdAt: new Date()
      });
    }

    if (teacher2 && student3) {
      this.sessions.push({
        id: `session_${this.nextId++}`,
        studentId: student3.id,
        teacherId: teacher2.id,
        topic: 'AI Model Feedback',
        scheduledDate: new Date(Date.now() - 172800000),
        duration: 45,
        status: 'completed',
        meetingLink: 'https://meet.google.com/qwe-rty-123',
        createdAt: new Date(Date.now() - 864000000),
        completedAt: new Date(Date.now() - 172800000)
      });
    }
  }

  private initializePredefinedReviews() {
    const teacher1 = this.users.find(user => user.email === 'teacher1@mindskill.ai');
    const student1 = this.users.find(user => user.email === 'student1@webdev.mindskill.ai');
    const student3 = this.users.find(user => user.email === 'student3@webdev.mindskill.ai');
    const completedSession = this.sessions.find(session => session.topic === 'Career Guidance Session');

    if (teacher1 && student1 && completedSession) {
      this.reviews.push({
        id: `review_${this.nextId++}`,
        sessionId: completedSession.id,
        reviewerId: student1.id,
        reviewerRole: 'student',
        targetId: teacher1.id,
        targetRole: 'teacher',
        rating: 4.8,
        comment: 'Supportive and clear guidance that helped me build a stronger portfolio.',
        createdAt: new Date(Date.now() - 86000000)
      });
      this.reviews.push({
        id: `review_${this.nextId++}`,
        sessionId: completedSession.id,
        reviewerId: teacher1.id,
        reviewerRole: 'teacher',
        targetId: student1.id,
        targetRole: 'student',
        rating: 5,
        comment: 'Highly engaged learner with strong follow-through.',
        createdAt: new Date(Date.now() - 85000000)
      });
    }

    const aiSession = this.sessions.find(session => session.topic === 'AI Model Feedback');
    const teacher2 = this.users.find(user => user.email === 'teacher2@mindskill.ai');
    const priorStudent3 = this.users.find(user => user.email === 'student3@webdev.mindskill.ai');
    if (aiSession && teacher2 && student3) {
      this.reviews.push({
        id: `review_${this.nextId++}`,
        sessionId: aiSession.id,
        reviewerId: teacher2.id,
        reviewerRole: 'teacher',
        targetId: student3.id,
        targetRole: 'student',
        rating: 4.6,
        comment: 'Patient student who grasped complex AI concepts quickly.',
        createdAt: new Date(Date.now() - 170000000)
      });
    }
  }

  // Create new user (for registration)
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'isActive'>): Promise<User> {
    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      ...userData,
      id: `user_${this.nextId++}`,
      createdAt: new Date(),
      isActive: true
    };

    this.users.push(newUser);
    return newUser;
  }

  // Authenticate user
  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = this.users.find(u =>
      u.email === email &&
      u.password === password &&
      u.isActive
    );

    return user || null;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async getAllUsers(): Promise<User[]> {
    return [...this.users];
  }

  async getUsersByRole(role: User['role']): Promise<User[]> {
    return this.users.filter(u => u.role === role && u.isActive);
  }

  async getSessionsByUser(userId: string, role: User['role']): Promise<Session[]> {
    if (role === 'student') {
      return this.sessions.filter(session => session.studentId === userId);
    }

    if (role === 'teacher') {
      return this.sessions.filter(session => session.teacherId === userId);
    }

    return [];
  }

  async getSessionById(id: string): Promise<Session | null> {
    return this.sessions.find(session => session.id === id) || null;
  }

  async createSession(sessionData: Omit<Session, 'id' | 'createdAt'>): Promise<Session> {
    const session: Session = {
      ...sessionData,
      id: `session_${this.nextId++}`,
      createdAt: new Date()
    };

    this.sessions.push(session);
    return session;
  }

  async updateSession(id: string, updates: Partial<Session>): Promise<Session | null> {
    const index = this.sessions.findIndex(session => session.id === id);
    if (index === -1) return null;

    this.sessions[index] = { ...this.sessions[index], ...updates };
    return this.sessions[index];
  }

  async createReview(reviewData: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    const existingReview = this.reviews.find(review => review.sessionId === reviewData.sessionId && review.reviewerId === reviewData.reviewerId);
    if (existingReview) {
      throw new Error('Review already submitted for this session');
    }

    const review: Review = {
      ...reviewData,
      id: `review_${this.nextId++}`,
      createdAt: new Date()
    };

    this.reviews.push(review);
    return review;
  }

  async getReviewsForTarget(targetId: string, targetRole: 'teacher' | 'student'): Promise<Review[]> {
    return this.reviews
      .filter(review => review.targetId === targetId && review.targetRole === targetRole)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async hasReviewForSession(sessionId: string, reviewerId: string): Promise<boolean> {
    return this.reviews.some(review => review.sessionId === sessionId && review.reviewerId === reviewerId);
  }

  async getRatingSummary(targetId: string, targetRole: 'teacher' | 'student'): Promise<RatingSummary> {
    const reviews = await this.getReviewsForTarget(targetId, targetRole);
    const reviewCount = reviews.length;
    const averageRating = reviewCount === 0 ? 0 : reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount;

    return {
      averageRating: Math.round((averageRating + Number.EPSILON) * 10) / 10,
      reviewCount,
      recentReviews: reviews.slice(0, 3)
    };
  }

  async getCourseSummaries(): Promise<{ courseId: string; courseName: string; students: number; teachers: number }[]> {
    const courseMap: Record<string, { courseId: string; courseName: string; students: number; teachers: number }> = {};

    this.users.forEach(user => {
      if (!user.courseId) return;
      const courseId = user.courseId;
      if (!courseMap[courseId]) {
        courseMap[courseId] = {
          courseId,
          courseName: courseId.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
          students: 0,
          teachers: 0
        };
      }

      if (user.role === 'student') courseMap[courseId].students += 1;
      if (user.role === 'teacher') courseMap[courseId].teachers += 1;
    });

    return Object.values(courseMap);
  }
}

// Export singleton instance
export const mockDatabase = new MockDatabase();

// Authentication utilities
export const authUtils = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPassword: (password: string): boolean => {
    return password.length >= 6;
  },

  hashPassword: (password: string): string => {
    return btoa(password);
  },

  verifyPassword: (password: string, hashedPassword: string): boolean => {
    return btoa(password) === hashedPassword;
  }
};
