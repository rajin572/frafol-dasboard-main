import { Modal } from "antd";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { AllImages } from "../../../../public/images/AllImages";
import { IGearOrder } from "../../../types";
import { formatDateWithAtTime } from "../../../utils/dateFormet";
import InvoiceDownloadButtons from "../../Button/InvoiceDownloadButtons";
import { buildGearInvoices } from "../../../utils/invoice/gearInvoices";
import { isOrderPaid } from "../../../utils/invoice/invoiceStatus";

interface GearOrderViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IGearOrder | null;
}
const GearOrderViewModal: React.FC<GearOrderViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const serverUrl = getImageUrl();
  // Payment invoices once the order is paid, final invoices once it is delivered.
  const showPaymentInvoices = isOrderPaid(
    currentRecord?.paymentStatus,
    currentRecord?.paidAt
  );
  const showFinalInvoices = currentRecord?.orderStatus === "delivered";
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      className="lg:!w-[1000px]"
    >
      <div className="p-3 space-y-6">
        {/* Product Card */}
        <div className="bg-white rounded-lg border border-[#E1E1E1] p-4 grid grid-cols-2 gap-4 items-center">
          <div className="flex items-center gap-4">
            <img
              src={
                currentRecord?.gearMarketplaceId?.gallery?.[0]
                  ? serverUrl + currentRecord?.gearMarketplaceId?.gallery?.[0]
                  : AllImages?.product
              }
              alt={currentRecord?.gearMarketplaceId?.name || "Product Image"}
              width={80}
              height={80}
            />
            <div>
              <h2 className="text-lg font-medium">
                {currentRecord?.gearMarketplaceId?.name || "Product Name"}
              </h2>
            </div>
          </div>
          <div className="text-right">
            <span className=" text-sm">Price</span>
            <p className="text-xl font-semibold">
              {currentRecord?.gearMarketplaceId?.mainPrice || 0}€
            </p>
          </div>
        </div>

        {/* Summary & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Order Summary */}
          <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Price :</span>
                <span className="text-black">
                  {currentRecord?.gearMarketplaceId?.price?.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span>VAT :</span>
                <span className="text-black">
                  {currentRecord?.gearMarketplaceId?.totalVatAmount?.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span>Service Charge :</span>
                <span className="text-black">
                  {currentRecord?.gearMarketplaceId?.platformCommission?.toFixed(2)}€
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span>Sub Total :</span>
                <span className="text-black font-medium">
                  {currentRecord?.gearMarketplaceId?.mainPrice?.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charge :</span>
                <span className="text-black font-medium">
                  {currentRecord?.gearMarketplaceId?.shippingCompany?.price?.toFixed(
                    2
                  )}
                  €
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-black">
                <span>Total (USD) :</span>
                {(
                  (currentRecord?.gearMarketplaceId?.mainPrice || 0) +
                  (currentRecord?.gearMarketplaceId?.shippingCompany?.price ||
                    0)
                ).toFixed(2)}{" "}
                €
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
            <h3 className="font-semibold mb-4">Payment Details</h3>
            <div className="text-sm ">
              <p>
                <span className="font-semibold">Transaction ID:</span>{" "}
                {currentRecord?.paymentId?.transactionId || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Payment Method:</span>{" "}
                {currentRecord?.paymentId?.paymentMethod || "N/A"}
                Card
              </p>
            </div>
          </div>
        </div>

        {/* Accepted Terms */}
        <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
          <h3 className="font-semibold mb-2">Accepted Terms</h3>
          <p className="text-sm ">
            <span className="font-semibold">Terms and Conditions Accepted: </span>
            {currentRecord?.termsAndConditionsAccepted ? `Yes (${formatDateWithAtTime(currentRecord?.createdAt)})` : "No"}
          </p>
        </div>

        {/* Company Details */}
        {currentRecord?.loginAsCompany && (
          <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
            <h3 className="font-semibold mb-2">Company Details</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-black">Company Name:</span>{" "}
                {currentRecord?.companyName || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-black">Address:</span>{" "}
                {currentRecord?.companyAddress}
                {currentRecord?.companyTown ? `, ${currentRecord.companyTown}` : ""}
                {currentRecord?.companyPostCode
                  ? `, ${currentRecord.companyPostCode}`
                  : ""}
              </p>
              <p>
                <span className="font-semibold text-black">ICO:</span>{" "}
                {currentRecord?.ico || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-black">DIC:</span>{" "}
                {currentRecord?.dic || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-black">IC DPH:</span>{" "}
                {currentRecord?.ic_dph || "N/A"}
              </p>
            </div>
          </div>
        )}

        {/* Shipping Method */}
        <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
          <h3 className="font-semibold mb-2">Preferred Shipping Method</h3>
          <p className="text-sm ">
            {currentRecord?.gearMarketplaceId?.shippingCompany?.name} -{" "}
            {currentRecord?.gearMarketplaceId?.shippingCompany?.price}€
          </p>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p className="text-sm ">
            {currentRecord?.shippingAddress}
            {currentRecord?.town ? `, ${currentRecord.town}` : ""}
            {currentRecord?.postCode ? `, ${currentRecord.postCode}` : ""}
          </p>
        </div>

        {/* Delivery Note */}
        <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
          <h3 className="font-semibold mb-2">Delivery Note</h3>
          <p className="text-sm ">{currentRecord?.deliveryNote || "N/A"}</p>
        </div>

        {currentRecord && (showPaymentInvoices || showFinalInvoices) && (
          <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
            <h3 className="font-semibold mb-3">Invoices</h3>
            <InvoiceDownloadButtons
              orderId={currentRecord.orderId}
              getInvoices={() => buildGearInvoices(currentRecord)}
              showPayment={showPaymentInvoices}
              showFinal={showFinalInvoices}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GearOrderViewModal;
