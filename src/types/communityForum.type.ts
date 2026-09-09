interface IAuthor {
  _id: string;
  name: string;
  sureName: string;
  profileImage: string;
  role: "user" | "admin" | "moderator";
}

interface ICommunityPost {
  _id: string;
  authorId: IAuthor;
  title: string;
  text: string;
  images: string[];
  isDeleted: boolean;
  approvalStatus: "approved" | "pending" | "rejected";
  createdAt: string;
  updatedAt: string;
  totalLikes: number;
  totalViewers: number;
  totalComments: number;
}

export type { ICommunityPost };
