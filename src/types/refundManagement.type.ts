export interface IUserBasic {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  profileId?: {
    _id?: string;
    about?: string;
    acceptTerms?: boolean;
    ramcuvaAgree?: boolean;
    bankName?: string;
    accountNumber?: string;
    routingNumber?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface IStatusTimestamps {
  createdAt: string;
  acceptedAt?: string;
  inProgressAt?: string;
  deliveryRequestAt?: string;
  deliveredAt?: string;
  refundRequestedAt?: string;
  refundedAt?: string | null;
  cancelledAt?: string | null;
}

export interface IGearMarketplace {
  _id: string;
  authorId: string;
  name: string;
  price: number;
  vatAmount: number;
  totalVatAmount?: number;
  description: string;
  condition: string;
  gallery: string[];
  shippingCompany?: {
    name: string;
    price: number;
  };
  extraInformation?: string;
  approvalStatus: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  mainPrice?: number;
  status?: string;
  categoryId?: string;
}

export interface IRefundManagement {
  _id: string;
  orderId: string;
  refundId?: string;
  title?: string; // for service orders
  userId?: IUserBasic; // client
  clientId?: IUserBasic;
  serviceProviderId?: IUserBasic; // only for service orders
  sellerId?: IUserBasic; // only for gear orders
  orderType: "direct" | "gear" | "workshop";
  serviceType?: string; // for service orders
  date?: string; // service order
  time?: string; // service order
  location?: string; // service order
  price?: number;
  priceWithServiceFee?: number;
  vatAmount?: number;
  totalPrice?: number; // optional for gear
  refundAmount: number;
  reason?: string;
  packageId?: string;
  deliveryDate?: string;
  refundDate?: string;
  status: string; // e.g. "pending" | "refunded" | "declined"
  paymentStatus: "Paid" | "Unpaid" | "Refunded" | "pending" | "completed";
  refundStatus: "pending" | "refunded" | "declined" | "completed" | "processing";
  isDeleted?: boolean;
  statusTimestamps?: IStatusTimestamps;
  gearMarketplaceId?: IGearMarketplace; // only for gear orders
  shippingAddress?: string;
  postCode?: string;
  town?: string;
  mobileNumber?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
  orderStatus?: string;
}

export interface IWorkshopRefund {
  _id: string;
  orderId: string;
  refundId?: string;
  refundAmount?: number;
  reason?: string;
  refundStatus: "pending" | "refunded" | "declined" | "completed";
  refundPayment?: {
    status: "pending" | "received" | "failed" | "refunded";
    amount: number;
    refundedAt?: string | null;
  };
  instructorPayment?: {
    status: "pending" | "received" | "failed";
    amount: number;
    paidAt: string | null;
  };
  clientId: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
    profileId?: {
      _id?: string;
      bankName?: string;
      accountNumber?: string;
    };
  };
  instructorId: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
    profileId?: {
      _id?: string;
      bankName?: string;
      accountNumber?: string;
    };
  };
  workshopId: {
    _id: string;
    title: string;
    date: string;
    time: string;
    locationType: string;
    vatAmount: number;
    price: number;
    mainPrice: number;
    image?: string;
  };
  paymentStatus: string;
  streetAddress?: string;
  town?: string;
  country?: string;
  isRegisterAsCompany?: boolean;
  name?: string;
  joinedAt?: string;
  createdAt: string;
  updatedAt: string;
}
