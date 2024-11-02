export type UserRole = {
  id: string;
  name: string;
};

export type UserSubscription = {
  id: string;
  subscriptionName: string;
  description: string;
  projectLimit: number;
  usageLimit: number;
  annualCost: number;
  monthlyCost: number;
  canCreateOrganization: boolean;
};

export type UserStatus = {
  id: string;  // Changed from number to string
  statusName: string;
  description: string;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  profilePictureUrl: string | null;
  role: UserRole;
  subscription: UserSubscription;
  userStatus: UserStatus;
};

export type LoginResponse = {
  status: string;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user: User;
  };
};