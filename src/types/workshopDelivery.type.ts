export interface IWorkshopDelivery {
  _id: string;
  orderId: string;
  instructorPayment: {
    status: "pending" | "received" | "failed";
    amount: number;
    paidAt: string | null;
  };
  clientId: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  instructorId: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
    profileId?: {
      _id: string;
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
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}
