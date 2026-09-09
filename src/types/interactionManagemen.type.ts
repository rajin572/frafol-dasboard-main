interface Sender {
  _id: string;
  name: string;
  sureName: string;
  email: string;
  profileImage: string;
  role: "admin" | "both"; // Assuming these are the only possible roles
}

interface User {
  _id: string;
  name: string;
  sureName: string;
  email: string;
  profileImage: string;
  role: "admin" | "both"; // Assuming these are the only possible roles
}

interface Chat {
  _id: string;
  users: User[];
  createdBy: string;
  unreadCounts: number;
  blockedUsers: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IInteractionMessage {
  _id: string;
  text: string;
  images: string[]; // Array of image URLs (empty if no images)
  readBy: string[]; // Array of user IDs who have read the message
  seen: boolean; // Whether the message has been seen
  sender: Sender; // Sender's information
  chat: Chat; // Associated chat details
  approvalStatus: "pending" | "approved" | "rejected"; // Status of the message approval
  createdAt: string; // Timestamp of message creation
  updatedAt: string; // Timestamp of last message update
}

interface Author {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  role: string;
}

interface IInteractionCommunity {
  _id: string;
  authorId: Author; // Reference to the author/user who created the post
  title: string;
  text: string;
  images: string[]; // Array of image URLs
  isDeleted: boolean; // Indicates if the post is deleted
  approvalStatus: "pending" | "approved" | "rejected"; // Approval state
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export type { IInteractionMessage, IInteractionCommunity };
