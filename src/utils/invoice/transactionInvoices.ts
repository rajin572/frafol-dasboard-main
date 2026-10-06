import dayjs from "dayjs";
import type { IEventOrder, IGearOrder, ISubscription, ITransaction } from "../../types";
import { buildEventInvoices } from "./eventInvoices";
import { buildGearInvoices } from "./gearInvoices";
import { InvoiceData, InvoiceSet } from "./invoiceTypes";
import { buildSubscriptionInvoice } from "./subscriptionInvoice";
import { buildWorkshopInvoices, isWorkshopCompleted } from "./workshopInvoices";

export interface TransactionInvoices {
  // Full order ID (file names, "Číslo objednávky").
  orderId: string;
  getInvoices: () => InvoiceSet;
  // Whether the order is completed and its completion date is known.
  showFinal: boolean;
}

const asObject = <T>(value: T | string | null | undefined): T | undefined =>
  value && typeof value === "object" ? value : undefined;

// A final invoice carries the completion date. Without it (and without a stored issue date)
// it would print a blank date, so the final invoices are only offered when it is known.
const hasCompletionDate = (completedAt?: unknown, storedIssueDate?: string): boolean =>
  !!completedAt || !!storedIssueDate;

const eventTransactionInvoices = (tx: ITransaction): TransactionInvoices | null => {
  const order = asObject<IEventOrder>(tx.eventOrderId);
  if (!order?.orderId) return null;

  const inProgressAt = order.statusTimestamps?.inProgressAt;
  // The order and the transaction both carry the professional / customer: use what either has.
  const enriched = {
    ...order,
    serviceProviderId: { ...asObject(order.serviceProviderId), ...tx.serviceProviderId },
    userId: { ...asObject(order.userId), ...tx.userId },
    // Payment date: the order's own, else when it went in progress, else the transaction itself.
    paidAt: order.paidAt || (inProgressAt ? new Date(inProgressAt).toISOString() : tx.createdAt),
  } as IEventOrder;

  return {
    orderId: order.orderId,
    getInvoices: () => buildEventInvoices(enriched),
    showFinal:
      order.status === "delivered" &&
      hasCompletionDate(order.statusTimestamps?.deliveredAt, order.invoices?.creatorFinal?.issueDate),
  };
};

// Gear transactions only carry the gear item, the seller and the customer's profile. The order
// itself (billing and delivery address, company details, delivery date) is only there when the
// transaction has it populated; otherwise the customer's profile is used for the billing data.
const gearTransactionInvoices = (tx: ITransaction): TransactionInvoices | null => {
  if (!tx.gear) return null;
  const populated = tx.gearOrderIds?.map((id) => asObject<IGearOrder>(id)).find(Boolean);
  const orderId = populated?.orderId || tx.orderId;
  if (!orderId) return null;

  const client = tx.client;
  const fromProfile = {
    name: client?.name,
    loginAsCompany: !!(client?.companyName || client?.ico),
    companyName: client?.companyName,
    ico: client?.ico,
    dic: client?.dic,
    ic_dph: client?.ic_dph,
    shippingAddress: client?.address,
    postCode: client?.zipCode,
    town: client?.town,
    companyAddress: client?.address,
    companyPostCode: client?.zipCode,
    companyTown: client?.town,
  };
  const order = {
    ...(populated ?? fromProfile),
    orderId,
    sellerId: { ...populated?.sellerId, ...tx.seller },
    gearMarketplaceId: { ...populated?.gearMarketplaceId, ...tx.gear },
    createdAt: populated?.createdAt || tx.createdAt,
    // The transaction is the payment itself.
    paidAt: populated?.paidAt || tx.createdAt,
  } as IGearOrder;

  return {
    orderId,
    getInvoices: () => buildGearInvoices(order),
    showFinal:
      tx.orderStatus === "delivered" &&
      hasCompletionDate(populated?.statusTimestamps?.deliveredAt, populated?.invoices?.creatorFinal?.issueDate),
  };
};

const workshopTransactionInvoices = (tx: ITransaction): TransactionInvoices | null => {
  const workshop = asObject(tx.workshopId);
  if (!workshop || !tx.orderId) return null;

  // Same shape as a workshop participant: the transaction mirrors the registration's billing data.
  const record = {
    orderId: tx.orderId,
    workshopId: workshop,
    clientId: tx.userId,
    name: tx.name,
    streetAddress: tx.streetAddress,
    town: tx.town,
    zipCode: tx.zipCode,
    companyName: tx.companyName,
    ICO: tx.ICO,
    DIC: tx.DIC,
    IC_DPH: tx.IC_DPH,
    // The transaction is the payment itself.
    paidAt: tx.createdAt,
  };

  return {
    orderId: tx.orderId,
    getInvoices: () => buildWorkshopInvoices(record, tx.serviceProviderId),
    showFinal: isWorkshopCompleted(record),
  };
};

// The invoices of an event / gear / workshop transaction, or null when the transaction does not
// carry enough of the order to build them.
export const getTransactionInvoices = (tx: ITransaction): TransactionInvoices | null => {
  switch (tx.paymentType) {
    case "event":
      return eventTransactionInvoices(tx);
    case "gear":
      return gearTransactionInvoices(tx);
    case "workshop":
      return workshopTransactionInvoices(tx);
    default:
      return null;
  }
};

// Frafol Choice: Frafol invoices the professional. Same builder as on the website.
export const buildSubscriptionTransactionInvoice = (
  tx: ITransaction,
  packs: ISubscription[] = []
): InvoiceData => {
  const days = tx.subscriptionDays ?? 365;
  // The website numbers the invoice by the package's ID, which the transaction does not carry:
  // find the package by its duration, and fall back to the transaction ID without a match.
  const pack = packs.find((candidate) => candidate.duration === days);
  return buildSubscriptionInvoice(
    tx.userId ?? {},
    // The subscription started at the payment, so it runs until `days` later.
    { subscriptionExpiryDate: dayjs(tx.createdAt).add(days, "day").toISOString() },
    { _id: pack?._id || tx._id, duration: days, price: tx.amount }
  );
};
