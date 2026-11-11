import { Checkbox, Modal } from "antd";
import SubscriptionInvoiceButton from "../../Button/SubscriptionInvoiceButton";
import { ITransaction } from "../../../types";
import { formatDateWithAtTime } from "../../../utils/dateFormet";

interface Props {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ITransaction | null;
}

const SubscriptionTransactionViewModal: React.FC<Props> = ({
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

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5 text-base-color">
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-secondary-color mb-1">
          Subscription Transaction
        </h3>
        <p className="text-sm text-[#989898] mb-5">
          Details of the subscription payment
        </p>

        <div className="text-xs sm:text-sm lg:text-base space-y-2">
          <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
            <span className="font-semibold">Date:</span>
            <span>{formatDate(currentRecord.createdAt)}</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
            <span className="font-semibold">Subscriber Name:</span>
            <span>{currentRecord.userId?.name || "—"}</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
            <span className="font-semibold">Email:</span>
            <span>{currentRecord.userId?.email || "—"}</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
            <span className="font-semibold">Subscription Days:</span>
            <span>{currentRecord.subscriptionDays ?? "—"} days</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
            <span className="font-semibold text-nowrap">Transaction ID:</span>
            <span className="text-wrap max-w-[200px] lg:max-w-[350px] break-all text-right">
              {currentRecord.transactionId}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
            <span className="font-semibold">Payment Method:</span>
            <span className="capitalize">{currentRecord.paymentMethod}</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
            <span className="font-semibold">Status:</span>
            <span
              className={`capitalize font-medium ${currentRecord.paymentStatus === "completed"
                ? "text-green-600"
                : currentRecord.paymentStatus === "failed"
                  ? "text-red-600"
                  : "text-yellow-600"
                }`}
            >
              {currentRecord.paymentStatus}
            </span>
          </div>

          <div className="flex items-center justify-between font-bold">
            <span className="text-secondary-color">Amount:</span>
            <span className="text-success">
              {currentRecord.amount?.toFixed(2)}€
            </span>
          </div>
        </div>

        {/* The subscription checkout cannot be submitted without this checkbox, so the
            transaction's createdAt is the moment the subscriber agreed to it. */}
        <div className="mt-5">
          <h4 className="text-sm sm:text-base lg:text-lg text-secondary-color font-bold mb-2">
            Accepted Terms
          </h4>
          <div className="bg-secondary-color/5 p-3 rounded">
            <Checkbox checked disabled>
              <span className="text-xs sm:text-sm lg:text-base">
                Súhlasím s našimi Všeobecné obchodné podmienky Zmluvné vzťahy a
                Všeobecné obchodné podmienky Online trh.
              </span>
            </Checkbox>
            <p className="text-xs sm:text-sm lg:text-base ml-6 text-[#989898]">
              Agreed on: {formatDateWithAtTime(currentRecord.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center mt-6">
          <SubscriptionInvoiceButton transaction={currentRecord} />
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionTransactionViewModal;
