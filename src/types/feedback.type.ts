interface User {
  _id: string;
  name: string;
  sureName: string;
  profileImage: string;
  role: string;
  switchRole: string;
}

interface IFeedback {
  _id: string;
  userId: User;
  text: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  adminVerified: string;
  __v: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
}

interface ISubscription {
  _id: string;
  title: string;
  duration: number;
  price: number;
  isActive: boolean;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
}

export type { IFeedback, ISubscription };
