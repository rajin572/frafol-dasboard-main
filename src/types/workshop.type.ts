import type { IOrderInvoices } from "./invoice.type";

interface Author {
  _id: string;
  name: string;
  sureName: string;
  companyName?: string;
  profileImage: string;
  role: string;
  address?: string;
  town?: string;
  zipCode?: string;
  ico?: string;
  dic?: string;
  ic_dph?: string;
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

// A registration of a customer for a workshop (one row of the admin participants list).
interface IWorkshopParticipant {
  _id: string;
  orderId: string;
  clientId?: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
    address?: string;
    town?: string;
    zipCode?: string;
  };
  // Populated on some endpoints, a plain id on others.
  instructorId?: Author | string;
  workshopId?: Partial<IWorkshop> | string;
  name?: string;
  streetAddress?: string;
  town?: string;
  zipCode?: string;
  country?: string;
  isRegisterAsCompany?: boolean;
  companyName?: string;
  ICO?: string;
  DIC?: string;
  IC_DPH?: string;
  paymentStatus?: string;
  paidAt?: string; // Customer payment date (issue date of the payment invoices)
  joinedAt?: string;
  invoices?: IOrderInvoices;
  termsAndConditionsAccepted?: boolean;
  earlyServiceCommencementAccepted?: boolean;
  withdrawalRightAcknowledgementAccepted?: boolean;
  createdAt?: string;
}

export type { IWorkshop, IWorkshopParticipant };
