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

export type userVerifyStatus = {
  id: string; // Changed from number to string
  statusName: string;
  description: string;
};

export type User = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  profilePictureUrl: string;
  bio: string;
  role: UserRole;
  subscription: UserSubscription;
  userVerifyStatus: userVerifyStatus;
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
