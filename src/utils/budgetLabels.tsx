export const budgetLabels: { [key: string]: string } = {
  under500: "Under 500€",
  "500-1000": "500€-1000€",
  "1000-2000": "1000€-2000€",
  "2000-5000": "2000€-5000€",
  over5000: "Over 5000€",
};
export const eventOrderStatus: { [key: string]: string } = {
  pending: "Pending",
  declined: "Declined",
  accepted: "Waiting for Payment",
  inProgress: "In Progress",
  deliveryRequestDeclined: "In Progress",
  deliveryRequest: "Delivery Request",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const gearOrderStatus: { [key: string]: string } = {
  inProgress: "In Progress",
  toConfirm: "To Confirm",
  deliveryRequest: "Delivery Request",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
