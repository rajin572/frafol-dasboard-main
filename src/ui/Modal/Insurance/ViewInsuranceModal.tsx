import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { IInsurance } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";

interface ViewInsuranceModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IInsurance | null;
}

const ViewInsuranceModal: React.FC<ViewInsuranceModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const serverUrl = getImageUrl();
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[450px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
            Insurance Feedback
          </h3>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={
                currentRecord?.userId?.profileImage
                  ? serverUrl + currentRecord?.userId?.profileImage
                  : AllImages.profile
              }
              alt={currentRecord?.userId?.name || "User Avatar"}
              className="w-16 h-16 object-cover rounded-full"
            />
            <div className="text-base sm:text-lg lg:text-xl font-semibold text-secondary-color">
              {currentRecord?.userId?.name || "Unknown User"}
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 mb-2 text-base">
              <span className="font-bold">Full Name:</span>
              <span>{currentRecord?.fullName}</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-base">
              <span className="font-bold">Company Name:</span>
              <span>{currentRecord?.companyName}</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-base">
              <span className="font-bold">Business Type:</span>
              <span>{currentRecord?.businessType}</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-base">
              <span className="font-bold">ICO:</span>
              <span>{currentRecord?.ico}</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-base">
              <span className="font-bold">Email:</span>
              <span>{currentRecord?.email}</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-base">
              <span className="font-bold">Phone Number:</span>
              <span>{currentRecord?.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-base">
              <span className="font-bold">Address:</span>
              <span>{currentRecord?.address}</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-base">
              <span className="font-bold">Estimated Value:</span>
              <span>{currentRecord?.estimatedValue}</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-base">
              <span className="font-bold">Any Previous Equipment:</span>
              <span>{currentRecord?.anyPreviousEquipment}</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-base">
              <span className="font-bold">Additional Notes:</span>
              <span>{currentRecord?.additionalNotes}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewInsuranceModal;
