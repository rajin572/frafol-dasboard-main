import { Modal } from "antd";
import { IPackage } from "../../../types";
import { AllImages } from "../../../../public/images/AllImages";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { FaEuroSign } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { FaUserAlt } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

interface ViewPackageManagementModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IPackage | null;
}

const ViewPackageManagementModal: React.FC<ViewPackageManagementModalProps> = ({
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
      className="lg:!w-[1000px]"
    >
      <div className="p-1.5 rounded-xl border border-background-color mt-10 relative">
        <img
          width={1000}
          height={1000}
          src={
            currentRecord?.thumbnailImage
              ? serverUrl + currentRecord?.thumbnailImage
              : AllImages?.cover
          }
          alt={currentRecord?.title}
          className="w-full h-80 sm:h-40 lg:h-52 xl:h-80 object-cover rounded-lg "
        />
        <div className="flex items-center justify-between gap-2 absolute top-3  w-full px-2">
          {currentRecord?.vatAmount && currentRecord?.vatAmount > 0 ? (
            <span className="text-xs sm:text-sm bg-secondary-color text-primary-color py-0.5 px-1.5 rounded-full ">
              VAT Included: {currentRecord?.vatAmount}%
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="px-1 mt-3">
          <span className="text-xs sm:text-sm bg-secondary-color text-primary-color py-0.5 px-1.5 rounded-full capitalize">
            {currentRecord?.category}
          </span>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold mt-1.5">
            {currentRecord?.title}
          </p>

          <p className="text-xs sm:text-sm lg:text-base mt-1.5">
            {currentRecord?.description}
          </p>

          <div className="flex flex-col gap-1 mt-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FaEuroSign className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                <p className="text-xs sm:text-sm lg:text-base font-semibold">
                  Price:
                </p>
              </div>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.price}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FaEuroSign className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                <p className="text-xs sm:text-sm lg:text-base font-semibold">
                  Price After Service Fee:
                </p>
              </div>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.mainPrice}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <LuClock className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                <p className="text-xs sm:text-sm lg:text-base font-semibold">
                  Duration:
                </p>
              </div>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.duration}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <IoCalendarOutline className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                <p className="text-xs sm:text-sm lg:text-base font-semibold">
                  Delivery Time:
                </p>
              </div>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.deliveryTime || 0 / 7} Week
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FaUserAlt className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                <p className="text-xs sm:text-sm lg:text-base font-semibold">
                  Author:
                </p>
              </div>
              <img
                src={
                  currentRecord?.authorId?.profileImage
                    ? serverUrl + currentRecord?.authorId?.profileImage
                    : AllImages?.profile
                }
                alt={currentRecord?.authorId?.name}
                width={30}
                height={30}
                className="rounded-full h-6 w-6 object-cover"
              />
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.authorId?.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FaUserAlt className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                <p className="text-xs sm:text-sm lg:text-base font-semibold">
                  Author Role:
                </p>
              </div>
              <p className="text-xs sm:text-sm lg:text-base capitalize">
                {currentRecord?.authorId?.role === "both"
                  ? "Photographer & Videographer"
                  : currentRecord?.authorId?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewPackageManagementModal;
