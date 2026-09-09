/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { IEventOrder } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { AllImages } from "../../../../public/images/AllImages";
import { formatDate, formetTime } from "../../../utils/dateFormet";
import { budgetLabels } from "../../../utils/budgetLabels";
import ReuseButton from "../../Button/ReuseButton";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import InvoiceDocumentFromAdminSide from "../../../utils/InvoiceDocumentFromAdminSide";

interface ViewOrderManagementModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IEventOrder | null;
}
const ViewOrderManagementModal: React.FC<ViewOrderManagementModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const serverUrl = getImageUrl();


  console.log(currentRecord)

  const handleProfessionalInvoiceDownload = (currentRecord: IEventOrder) => {
    const toastId = toast.loading("Downloading...", {
      duration: 2000,
    });
    // Generate the PDF using @react-pdf/renderer's pdf function
    pdf(
      <InvoiceDocumentFromAdminSide
        currentRecord={currentRecord as IEventOrder}
      />
    )
      .toBlob()
      .then((blob: any) => {
        // Use file-saver to trigger the download
        saveAs(blob, `${currentRecord.orderId}-invoice.pdf`);
        toast.success("Downloaded successfully!", { id: toastId });
      })
      .catch((_error: any) => {
        toast.error("Download failed", { id: toastId });
      });
  };

  const serviceFeeAmount: number = (currentRecord as any)?.priceWithServiceFee - (currentRecord as any)?.price

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5 text-[#1a1a1a]">
        <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-1">
          Order Details
        </h3>
        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold mb-5">
          {currentRecord?.orderId}
        </p>
        {/* Title & Category */}
        <div className="mb-3">
          <div className="flex items-center gap-x-2">
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
              {currentRecord?.packageId?.title || currentRecord?.title}
            </p>
            <p className={`text-xs sm:text-sm font-bold border w-fit rounded-2xl py-0.5 px-2 mt-1 ${currentRecord?.orderType === "custom" ? "text-secondary-color" : "border-base-color text-base-color"}`}>
              {currentRecord?.orderType === "custom" ? "Custom" : "Direct"}
            </p>
          </div>

          <p className="text-sm sm:text-base lg:text-kg xl:text-xl font-medium">
            {currentRecord?.serviceType === "both" ? "Photography & Videography" : currentRecord?.serviceType}
          </p>
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium mt-2">
            By {currentRecord?.serviceProviderId?.name}
          </p>
          <p className="text-xs sm:text-sm lg:text-base text-base-color/80 mt-2">
            {currentRecord?.description || currentRecord?.packageId?.description}
          </p>
        </div>

        {/* Client Info */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
            Client Information
          </h4>
          <div className="flex flex-col gap-1 my-2 ">
            <img
              src={
                currentRecord?.userId?.profileImage
                  ? serverUrl + currentRecord?.userId?.profileImage
                  : AllImages.profile
              }
              alt={currentRecord?.userId?.name || "Client Avatar"}
              width={50}
              height={50}
              className="rounded-full object-cover size-7"
            />
            <div>
              <p className="font-bold text-lg">
                {currentRecord?.companyName ||
                  currentRecord?.name ||
                  currentRecord?.userId?.name}
              </p>
              <p className="text-base font-semibold text-gray-600">
                {currentRecord?.isRegisterAsCompany ? "Company" : "Personal"}
              </p>

              {/* <p className="text-sm text-gray-600">Wedding Photographer</p> */}
            </div>
          </div>
          {currentRecord?.ICO ? (
            <p className="text-sm font-semibold">
              ICO :{" "}
              <span className="text-secondary-color">{currentRecord?.ICO}</span>
            </p>
          ) : null}
          {currentRecord?.IC_DPH ? (
            <p className="text-sm font-semibold">
              IC_DPH :{" "}
              <span className="text-secondary-color">
                {currentRecord?.IC_DPH}
              </span>
            </p>
          ) : null}
          {currentRecord?.DIC ? (
            <p className="text-sm font-semibold">
              DIC :{" "}
              <span className="text-secondary-color">{currentRecord?.DIC}</span>
            </p>
          ) : null}
        </div>

        {/* Photographer Info */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
            Photographer Information
          </h4>
          <div className="flex items-center gap-1 mt-2">
            <img
              src={
                currentRecord?.serviceProviderId?.profileImage
                  ? serverUrl + currentRecord?.serviceProviderId?.profileImage
                  : AllImages.profile
              }
              alt={currentRecord?.serviceProviderId?.name || "Client Avatar"}
              width={50}
              height={50}
              className="rounded-full h-10 w-10 object-cover"
            />
            <div>
              <p className="font-bold text-base">
                {currentRecord?.serviceProviderId?.name}
              </p>
              <p className="text-sm text-gray-600">
                {" "}
                {currentRecord?.serviceProviderId?.role === "both"
                  ? "Photographer & Videographer"
                  : currentRecord?.serviceProviderId?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
            Order Information
          </h4>
          <div className="mt-2">
            {" "}
            <p className="text-xs sm:text-sm lg:text-base">
              <span className="font-semibold">Order Date :</span>{" "}
              {`${formatDate(currentRecord?.createdAt)}`}
            </p>
            {currentRecord?.status !== "pending" && (
              <p className="text-xs sm:text-sm lg:text-base">
                <span className="font-semibold">Delivery Date :</span>{" "}
                {`${formatDate(currentRecord?.deliveryDate)}`}
              </p>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold mb-2">
            Event Details
          </h4>
          <p className="text-xs sm:text-sm lg:text-base mt-1 flex items-center gap-1 mb-2">
            <FaCalendarAlt /> <span>Event Date : </span>
            {formatDate(currentRecord?.date)}
          </p>
          <p className="text-xs sm:text-sm lg:text-base flex items-start gap-2 mb-2">
            <div className="flex items-center text-nowrap">
              <FaMapMarkerAlt /> <span>Location : </span>
            </div>
            {currentRecord?.location}
          </p>
          <p className="text-xs sm:text-sm lg:text-base flex items-center gap-2 mb-2">
            <FaClock /> <span>Time : </span>
            {formetTime(currentRecord?.time)}
          </p>
        </div>

        {/* Payment Details */}
        {/* Payment Details */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
            Payment Details
          </h4>

          {
            currentRecord?.totalPrice && (
              <>
                <p className="text-xs sm:text-sm lg:text-base xl:text-lg mt-2">
                  <span className="font-semibold">
                    Amount Without Service Fee:
                  </span>{" "}
                  {currentRecord?.totalPrice - serviceFeeAmount}
                </p>
                <p className="text-xs sm:text-sm lg:text-base xl:text-lg mt-2">
                  <span className="font-semibold">
                    Service Fee Amount:
                  </span>{" "}
                  {serviceFeeAmount}
                </p>
              </>
            )
          }
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg mt-2">
            <span className="font-semibold">
              {currentRecord?.totalPrice ? "Total Amount" : "Budget Range"} :
            </span>{" "}
            {currentRecord?.totalPrice ||
              budgetLabels[currentRecord?.budget_range as string] ||
              currentRecord?.budget_range}
          </p>

        </div>


        {currentRecord?.status === "cancelled" && (
          <div className="mb-4">
            <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
              Cancel Reason
            </h4>
            <div className="mt-2">
              {" "}
              <p className="text-xs sm:text-sm lg:text-base">
                <span className="font-semibold">Reason :</span>{" "}
                {currentRecord?.cancelReason}
              </p>
            </div>
          </div>
        )}
        {currentRecord?.status === "inProgress" &&
          currentRecord?.deliveryRequestDeclinedReason && (
            <div className="mb-4">
              <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
                Decline Reason
              </h4>
              <div className="mt-2">
                {" "}
                <p className="text-xs sm:text-sm lg:text-base">
                  <span className="font-semibold">Reason :</span>{" "}
                  {currentRecord?.deliveryRequestDeclinedReason}
                </p>
              </div>
            </div>
          )}
        {currentRecord?.status === "delivered" ? (
          <div className="mt-5 flex flex-col items-center gap-5">
            <ReuseButton
              onClick={() =>
                handleProfessionalInvoiceDownload(currentRecord as IEventOrder)
              }
              variant="secondary"
              className="!w-fit"
            >
              Download Invoice with Admin
            </ReuseButton>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default ViewOrderManagementModal;
