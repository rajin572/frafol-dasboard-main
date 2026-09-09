interface IProfessional {
  _id: string;
  profileId: {
    _id: string;
    about: string;
  };
  name: string;
  phone: string;
  dateOfBirth: string;
  sureName: string;
  companyName: string;
  email: string;
  profileImage: string;
  role: string;
  switchRole: string;
  address: string;
  town: string;
  country: string;
  zipCode: string;
  hourlyRate: number;
  maxHourlyRate: number;
  minHourlyRate: number;
  ico: string;
  dic: string;
  ic_dph: string;
  rating: number;
  totalReview: number;
  averageRating: number;
  photographerSpecializations: string[];
  videographerSpecializations: string[];
  adminVerified: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  galery: string[];
  travelTowns: string[];
}

export type { IProfessional };
