export * from "./auth.type";
export * from "./admin.type";
export * from "./deleteAccountRequest.type";
export * from "./users.type";
export * from "./earning.type";
export * from "./report.type";
export * from "./approvals.type";
export * from "./feedback.type";
export * from "./gear.type";
export * from "./package.type";
export * from "./workshop.type";
export * from "./eventOrder.type";
export * from "./gearOrder.type";
export * from "./interactionManagemen.type";
export * from "./communityForum.type";

interface NotificationMessage {
  fullName: string;
  image: string;
  text: string;
  photos: string[];
  _id: string;
}

export interface INotification {
  _id: string;
  userId: string;
  receiverId: string;
  message: NotificationMessage;
  type: "DirectBookingRequest" | string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
