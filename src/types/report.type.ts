interface IReport {
  _id: string;
  userId: {
    _id: string;
    name: string;
    sureName: string;
    profileImage: string;
    role: string;
    switchRole: string;
  };
  name: string;
  email: string;
  image: string;
  reason: string;
  message: string;
  agreement: boolean;
  url: string;
  isCompleted: boolean;
  isNotified: boolean;
  isDeleted: boolean;
  createdAt: string; // or Date if you convert it
  updatedAt: string; // or Date if you convert it
}

export type { IReport };
