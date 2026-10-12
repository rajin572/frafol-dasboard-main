// Payment statuses that mean "not paid (yet)". Orders use "paid" / "unpaid", gear orders and
// workshop registrations "pending" / "completed"; anything else counts as paid.
const UNPAID_STATUSES = ["unpaid", "pending", "failed"];

// Event order statuses reached before the customer has paid for a custom quote: "pending"
// (awaiting the professional's acceptance) and "accepted" (accepted, now "Waiting for Payment").
// Any later status (inProgress, deliveryRequest, delivered, ...) could only be reached by paying.
const WAITING_FOR_PAYMENT_STATUSES = ["pending", "accepted"];

// The payment invoices are available once the order is paid. `orderStatus` (the event order's own
// status, when given) is authoritative: it overrides a stale or missing `paymentStatus`/`paidAt`.
export const isOrderPaid = (
  paymentStatus?: string,
  paidAt?: string,
  orderStatus?: string
): boolean => {
  if (orderStatus) {
    return !WAITING_FOR_PAYMENT_STATUSES.includes(orderStatus.toLowerCase());
  }
  return (
    !!paidAt ||
    (!!paymentStatus && !UNPAID_STATUSES.includes(paymentStatus.toLowerCase()))
  );
};
