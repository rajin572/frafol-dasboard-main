import { Modal } from "antd";
import InvoiceDownloadButtons from "../../Button/InvoiceDownloadButtons";
import SubscriptionInvoiceButton from "../../Button/SubscriptionInvoiceButton";
import { ITransaction } from "../../../types";
import { getTransactionInvoices } from "../../../utils/invoice/transactionInvoices";

interface TransactionViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ITransaction | null;
}

const TransactionViewModal: React.FC<TransactionViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  if (!currentRecord) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const paymentType = currentRecord.paymentType;
  const isSubscription = paymentType === "subscription";

  // Event / gear / workshop: the four invoices of the order.
  const hasOrderInvoices =
    paymentType === "event" || paymentType === "gear" || paymentType === "workshop";
  const invoices = hasOrderInvoices ? getTransactionInvoices(currentRecord) : null;
  const showPaymentInvoices = currentRecord.paymentStatus === "completed";

  // ── Per-type pricing values ──────────────────────────────────────────
  const eventOrder =
    paymentType === "event" &&
      currentRecord.eventOrderId &&
      typeof currentRecord.eventOrderId !== "string"
      ? currentRecord.eventOrderId
      : null;

  const gear =
    paymentType === "gear" && currentRecord.gear ? currentRecord.gear : null;

  const workshop =
    paymentType === "workshop" &&
      currentRecord.workshopId &&
      typeof currentRecord.workshopId !== "string"
      ? currentRecord.workshopId
      : null;

  const eventServiceFee = eventOrder
    ? (eventOrder.priceWithServiceFee || 0) - (eventOrder.price || 0)
    : 0;

  const workshopServiceFee = workshop
    ? workshop.mainPrice - workshop.price - workshop.vatAmount
    : 0;

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5">
        <div className="text-base-color">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-secondary-color">
            Transaction Details
          </h3>

          <div className="text-xs sm:text-sm lg:text-base mt-3 space-y-2">
            {/* ── Common fields ── */}
            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold">Date:</span>
              <span>{formatDate(currentRecord.createdAt)}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold">Payment Type:</span>
              <span className="capitalize">{paymentType}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold">Client Name:</span>
              <span>{currentRecord.client?.name || currentRecord.userId?.name || "—"}</span>
            </div>

            {!isSubscription && (
              <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                <span className="font-semibold">Professional Name:</span>
                <span>
                  {currentRecord.seller?.name ||
                    currentRecord.serviceProviderId?.name ||
                    "—"}
                </span>
              </div>
            )}

            {isSubscription && (
              <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                <span className="font-semibold">Subscription Days:</span>
                <span>{currentRecord.subscriptionDays ?? "—"} days</span>
              </div>
            )}

            {/* Order ID */}
            {(eventOrder || gear || workshop) && (
              <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                <span className="font-semibold">Order ID:</span>
                <span>
                  {eventOrder?.orderId ||
                    currentRecord.orderId ||
                    "—"}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold text-nowrap">Transaction ID:</span>
              <span className="text-wrap max-w-[200px] lg:max-w-[350px] break-all">
                {currentRecord.transactionId}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold">Payment Method:</span>
              <span className="capitalize">{currentRecord.paymentMethod}</span>
            </div>

            {/* ── Event pricing ── */}
            {eventOrder && (
              <>
                <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                  <span className="font-semibold">Price:</span>
                  <span>€{(eventOrder.price || 0).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                  <span className="font-semibold">Service Fee:</span>
                  <span>€{eventServiceFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                  <span className="font-semibold">VAT:</span>
                  <span>€{(eventOrder.vatAmount || 0).toFixed(2)}</span>
                </div>
                {(currentRecord.couponDiscount ?? 0) > 0 && (
                  <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                    <span className="font-semibold text-success">Coupon Discount:</span>
                    <span className="text-success">
                      -€{(currentRecord.couponDiscount ?? 0).toFixed(2)}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* ── Gear pricing ── */}
            {gear && (
              <>
                <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                  <span className="font-semibold">Item:</span>
                  <span>{gear.name}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                  <span className="font-semibold">Price:</span>
                  <span>€{gear.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                  <span className="font-semibold">Service Fee:</span>
                  <span>€{gear.platformCommission.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                  <span className="font-semibold">VAT:</span>
                  <span>€{gear.totalVatAmount.toFixed(2)}</span>
                </div>
                {gear.shippingCompany && (
                  <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                    <span className="font-semibold">
                      Shipping ({gear.shippingCompany.name}):
                    </span>
                    <span>€{gear.shippingCompany.price.toFixed(2)}</span>
                  </div>
                )}
                {(currentRecord.couponDiscount ?? 0) > 0 && (
                  <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                    <span className="font-semibold text-success">Coupon Discount:</span>
                    <span className="text-success">
                      -€{(currentRecord.couponDiscount ?? 0).toFixed(2)}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* ── Workshop pricing ── */}
            {workshop && (
              <>
                <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                  <span className="font-semibold">Workshop:</span>
                  <span>{workshop.title}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                  <span className="font-semibold">Price:</span>
                  <span>€{workshop.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                  <span className="font-semibold">Service Fee:</span>
                  <span>€{workshopServiceFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                  <span className="font-semibold">VAT:</span>
                  <span>€{workshop.vatAmount.toFixed(2)}</span>
                </div>
                {(currentRecord.couponDiscount ?? 0) > 0 && (
                  <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                    <span className="font-semibold text-success">Coupon Discount:</span>
                    <span className="text-success">
                      -€{(currentRecord.couponDiscount ?? 0).toFixed(2)}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* ── Total ── */}
            <div className="flex items-center justify-between font-bold pt-1">
              <span className="text-secondary-color">Total Amount:</span>
              <span className="text-success">
                {eventOrder
                  ? `€${(eventOrder.totalPrice || 0).toFixed(2)}`
                  : gear
                    ? `€${gear.mainPrice.toFixed(2)}`
                    : workshop
                      ? `€${workshop.mainPrice.toFixed(2)}`
                      : `€${(currentRecord.amount || 0).toFixed(2)}`}
              </span>
            </div>
          </div>

          {/* ── Download buttons ── */}
          {hasOrderInvoices && (!invoices || showPaymentInvoices || invoices.showFinal) && (
            <div className="mt-5">
              <h4 className="font-semibold mb-2">Invoices</h4>
              {invoices ? (
                <InvoiceDownloadButtons
                  orderId={invoices.orderId}
                  getInvoices={invoices.getInvoices}
                  showPayment={showPaymentInvoices}
                  showFinal={invoices.showFinal}
                />
              ) : (
                <p className="text-xs sm:text-sm text-gray-500">
                  This transaction does not include the order details needed for its invoices.
                </p>
              )}
            </div>
          )}

          {paymentType === "subscription" && (
            <div className="flex items-center justify-center mt-5">
              <SubscriptionInvoiceButton transaction={currentRecord} />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TransactionViewModal;
