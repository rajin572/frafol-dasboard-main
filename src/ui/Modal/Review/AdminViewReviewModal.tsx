import { Image, Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { IReport } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { Link } from "react-router-dom";

interface AdminViewReviewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IReport | null;
}

const AdminViewReviewModal: React.FC<AdminViewReviewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  console.log(currentRecord);
  const { userId, reason, image, name, email, message, url } = currentRecord || {};
  const serverUrl = getImageUrl();
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[768px]"
    >
      <div className="p-5">
        <div>
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color">
            Report Details
          </h3>

          <h3 className="text-base sm:text-lg lg:text-xl font-bold  mt-5">
            Reported By
          </h3>
          <div className="flex flex-col justify-center items-center gap-1">
            <img
              src={
                userId?.profileImage
                  ? serverUrl + userId?.profileImage
                  : AllImages.profile
              }
              alt={userId?.name || "User"}
              className="w-auto h-20 object-cover rounded-full"
            />
            <div className="text-base sm:text-lg lg:text-xl font-semibold text-secondary-color">
              {name}
            </div>
            <div className="text-sm text-gray-500">{email}</div>
            <div className="text-sm text-gray-500">{userId?.role === "both" ? "Photographer & Videographer" : userId?.role}</div>
          </div>

          <Image
            src={
              image
                ? serverUrl + image
                : AllImages.profile
            }
            alt={userId?.name || "User"}
            className="w-auto h-auto max-w-96 max-h-60 object-cover mt-5"
          />
          <div className="mt-5">
            <div className="text-lg flex items-center gap-2">
              <span className="font-medium text-secondary-color">Website Url:</span>
              <Link to={url as string} target="_blank" className="text-sm sm:text-base lg:text-lg ">
                {url}
              </Link>
            </div>
            <div className="text-lg mt-5">
              <span className="font-medium text-secondary-color">Issue for illegal content:</span>
              <div className="text-sm sm:text-base lg:text-lg text-base-color mt-1 p-2 bg-gray-100 rounded-md">
                {reason}
              </div>
            </div>
            <div className="text-lg mt-5">
              <span className="font-medium text-secondary-color">Message:</span>
              <div className="text-sm sm:text-base lg:text-lg text-base-color mt-1 p-2 bg-gray-100 rounded-md">
                {message}
              </div>
            </div>

            <div className="mt-3 text-right text-xs sm:text-sm text-gray-400">
              Reported on:{" "}
              {currentRecord?.createdAt
                ? new Date(currentRecord.createdAt).toLocaleString()
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminViewReviewModal;
