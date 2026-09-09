/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import ReuseButton from "../../Button/ReuseButton";
import { ITransaction } from "../../../types";
import InvoiceFrafolChoiceFromClientSide from "../../../utils/InvoiceFrafolChoiceFromClientSide";

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

  const handleInvoiceDownload = () => {
    const days = currentRecord.subscriptionDays ?? 365;

    const expiryDate = new Date(currentRecord.createdAt);
    expiryDate.setDate(expiryDate.getDate() + days);

    const myData: any = {
      name: currentRecord.userId?.name || "",
      sureName: "",
      email: currentRecord.userId?.email || "",
      companyName: "",
      address: "",
      town: "",
      country: "",
      ico: "",
      dic: "",
      ic_dph: "",
      phone: "",
    };

    const subscriptionData: any = {
      subscriptionExpiryDate: expiryDate.toISOString(),
    };

    const pack: any = {
      _id: currentRecord._id,
      title:
        days >= 365
          ? "Annual Plan"
          : days >= 180
            ? "Semi-Annual Plan"
            : `${days}-Day Plan`,
      price: currentRecord.amount,
      duration: days,
    };

    const toastId = toast.loading("Downloading...", { duration: 2000 });
    pdf(
      <InvoiceFrafolChoiceFromClientSide
        myData={myData}
        subscriptionData={subscriptionData}
        pack={pack}
      />
    )
      .toBlob()
      .then((blob: any) => {
        saveAs(
          blob,
          `subscription-invoice-${currentRecord._id.slice(-8)}.pdf`
        );
        toast.success("Downloaded successfully!", { id: toastId });
      })
      .catch(() => toast.error("Download failed", { id: toastId }));
  };

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
              className={`capitalize font-medium ${
                currentRecord.paymentStatus === "completed"
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
              ${currentRecord.amount?.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center mt-6">
          <ReuseButton
            variant="secondary"
            className="!px-5 !py-4 !w-fit"
            onClick={handleInvoiceDownload}
          >
            Download Invoice
          </ReuseButton>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionTransactionViewModal;
