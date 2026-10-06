// Payment statuses that mean "not paid (yet)". Orders use "paid" / "unpaid", gear orders and
// workshop registrations "pending" / "completed"; anything else counts as paid.
const UNPAID_STATUSES = ["unpaid", "pending", "failed"];

// The payment invoices are available once the order is paid.
export const isOrderPaid = (paymentStatus?: string, paidAt?: string): boolean =>
  !!paidAt ||
  (!!paymentStatus && !UNPAID_STATUSES.includes(paymentStatus.toLowerCase()));
