export interface IUserBasic {
  _id: string;
  name: string;
  sureName?: string;
  email: string;
  profileImage?: string;
  role?: string;
  switchRole?: string;
  address?: string;
  town?: string;
  zipCode?: string;
  ico?: string;
  dic?: string;
  ic_dph?: string;
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
  cancelRequestAt?: string;
  cancelRequestDeclinedAt?: string;
}

export interface IStatusHistory {
  status: string;
  reason?: string;
  changedAt: string;
  _id: string;
}

export interface IPackageBasic {
  _id: string;
  title: string;
  description: string;
  vatAmount: number;
  price: number;
  mainPrice: number;
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
  title?: string;
  userId?: IUserBasic;
  clientId?: IUserBasic;
  serviceProviderId?: IUserBasic;
  sellerId?: IUserBasic;
  orderType: "custom" | "direct" | "gear" | "workshop" | string;
  serviceType?: string;
  date?: string;
  time?: string;
  location?: string;
  price?: number;
  priceWithServiceFee?: number;
  vatAmount?: number;
  totalPrice?: number;
  budget_range?: string;
  duration?: string;
  refundAmount?: number;
  reason?: string;
  cancelReason?: string;
  cancelRequestedBy?: string;
  cancelApprovalDate?: string;
  cancelApprovalBy?: string;
  packageId?: string | IPackageBasic;
  deliveryDate?: string;
  lastDeliveryDate?: string;
  refundDate?: string;
  status: "cancelled" | "pending" | "refunded" | "declined" | string;
  paymentStatus: "Paid" | "Unpaid" | "Refunded" | "pending" | "completed" | string;
  refundStatus?: "pending" | "refunded" | "declined" | "completed" | "processing";
  isDeleted?: boolean;
  statusTimestamps?: IStatusTimestamps;
  statusHistory?: IStatusHistory[];
  gearMarketplaceId?: IGearMarketplace;
  shippingAddress?: string;
  streetAddress?: string;
  postCode?: string;
  town?: string;
  zipCode?: string;
  country?: string;
  mobileNumber?: string;
  email?: string;
  name?: string;
  description?: string;
  couponDiscount?: number;
  isRegisterAsCompany?: boolean;
  paymentId?: string;
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
