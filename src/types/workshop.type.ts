interface Author {
  _id: string;
  name: string;
  sureName: string;
  profileImage: string;
  role: string;
}

interface IWorkshop {
  vatAmount: number;
  vatPercent: number;
  _id: string;
  authorId: Author;
  title: string;
  date: string;
  time: string;
  locationType: string;
  location: string;
  workshopLink: string;
  price: number;
  mainPrice: number;
  description: string;
  image: string;
  maxParticipant: number;
  totalParticipants: number;
  approvalStatus: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type { IWorkshop };
