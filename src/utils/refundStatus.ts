import { IRefundManagement } from "../types/refundManagement.type";

// The refund-management endpoints return `refundStatus` on every order: "pending" (event orders) or
// "unpaid" (gear orders) while the refund is still open. Any of these means it has been paid back.
// The order's own `paymentStatus` is NOT used here, it describes the payout to the professional.
const REFUNDED_STATUSES = ["refunded", "paid", "completed", "received"];

export const isRefundCompleted = (record?: Pick<IRefundManagement, "refundStatus">): boolean =>
  REFUNDED_STATUSES.includes(String(record?.refundStatus ?? "").toLowerCase());
