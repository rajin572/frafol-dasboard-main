export interface IDeleteAccountRequest {
  _id: string;
  profileId: string;
  name: string;
  sureName?: string;
  companyName?: string;
  email: string;
  profileImage?: string;
  role: string;
  deleteRequestStatus: "pending" | "approved" | "rejected";
  deleteRequestedAt: string;
  deleteRequestReason?: string;
  activeEventOrders: number;
  activeGearOrders: number;
  createdAt: string;
  updatedAt: string;
}
