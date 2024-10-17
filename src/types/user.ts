// user.ts
export type UserRole = {
  id: number;
  name: string;
};

export type UserSubscription = {
  id: number;
  subscriptionName: string;
  description: string;
  projectLimit: number;
  usageLimit: number;
  annualCost: number;
  monthlyCost: number;
  canCreateOrganization: boolean;
};

export type UserStatus = {
  id: number;
  statusName: string;
  description: string;
};

export type User = {
  id: number;
  fullName: string;
  email: string;
  profilePictureUrl: string | null;
  role: UserRole;
  subscription: UserSubscription;
  userStatus: UserStatus;
};
