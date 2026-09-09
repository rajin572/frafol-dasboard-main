export interface IUserBasic {
  _id: string;
  name: string;
  sureName?: string;
  companyName?: string;
  phone?: string;
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
  deliveryRequestAt?: string | null;
  deliveryRequestDeclineAt?: string | null;
  deliveredAt?: string | null;
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
  authorId?: string;
  name: string;
  price: number;
  vatAmount: number;
  totalVatAmount?: number | null;
  platformCommission?: number;
  mainPrice?: number;
  description: string;
  condition: string;
  gallery: string[];
  shippingCompany?: {
    name: string;
    price: number;
  };
  extraInformation?: string;
  approvalStatus: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
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
  orderType: "custom" | "direct" | "gear" | string;
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
  cancelledBy?: string;
  cancelApprovalDate?: string;
  cancelApprovalBy?: string;
  packageId?: string | IPackageBasic;
  deliveryDate?: string;
  lastDeliveryDate?: string;
  refundDate?: string;
  status: "cancelled" | "pending" | "refunded" | "declined" | string;
  paymentStatus: "Paid" | "Unpaid" | "Refunded" | "pending" | "received" | "completed" | string;
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
  companyName?: string;
  companyAddress?: string;
  deliveryNote?: string;
  loginAsCompany?: boolean;
  ico?: string;
  dic?: string;
  ic_dph?: string;
  description?: string;
  couponDiscount?: number;
  isRegisterAsCompany?: boolean;
  paymentId?:
    | string
    | {
        _id?: string;
        transactionId?: string;
        paymentMethod?: string;
      };
  createdAt: string;
  updatedAt: string;
  orderStatus?: string;
}
