export interface AdminDashboardData {
  status: { onlineUsers: number; idleUsers: number; offlineUsers: number };
  users: {
    allUsers: number;
    bannedUsers: number;
    adminVerifiedUsers: number;
    adminUsers: number;
  };
  profiles: {
    emailUnverified: number;
    emailVerified: number;
    completeProfile: number;
  };
  reports: { postReports: number; userReports: number };
}
