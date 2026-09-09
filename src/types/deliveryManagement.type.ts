interface IUserBasic {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  profileId: {
    _id: string;
    about: string;
    acceptTerms: boolean;
    ramcuvaAgree: boolean;
    bankName: string;
    accountNumber: string;
    routingNumber: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface IStatusTimestamps {
  createdAt: string;
  acceptedAt?: string;
  inProgressAt?: string;
  deliveryRequestAt?: string;
  deliveryRequestDeclineAt?: string | null;
  deliveredAt?: string;
  cancelledAt?: string | null;
}

interface IStatusHistory {
  status: string;
  changedAt: string;
  _id: string;
}

interface IExtensionRequest {
  requestedBy: string;
  newDeliveryDate: string;
  reason: string;
  approved: boolean;
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface IGearMarketplace {
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

export interface IDeliveryManagement {
  _id: string;
  orderId: string;
  title?: string; // for service orders
  userId: IUserBasic; // client
  serviceProviderId?: IUserBasic; // only for service orders
  sellerId?: IUserBasic; // only for gear orders
  orderType: "direct" | "gear";
  serviceType?: string; // for service orders
  date?: string; // service order
  time?: string; // service order
  location?: string; // service order
  price: number;
  priceWithServiceFee: number;
  vatAmount: number;
  totalPrice?: number; // optional for gear
  packageId?: string;
  deliveryDate: string;
  lastDeliveryDate?: string;
  isRegisterAsCompany?: boolean;
  status: string;
  paymentStatus: string;
  isDeleted: boolean;
  statusTimestamps: IStatusTimestamps;
  statusHistory?: IStatusHistory[];
  extensionRequests?: IExtensionRequest[];
  gearMarketplaceId?: IGearMarketplace; // only for gear orders
  shippingAddress?: string;
  postCode?: string;
  town?: string;
  mobileNumber?: string;
  email?: string;
  loginAsCompany?: boolean;
  ico?: string;
  dic?: string;
  ic_dph?: string;
  companyAddress?: string;
  deliveryNote?: string;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
  orderStatus: string;
}
