
import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { FaStar } from "react-icons/fa";
import ReuseButton from "../../Button/ReuseButton";
import { IUser } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { formatDate } from "../../../utils/dateFormet";
interface UserModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IUser | null;
  activeTab: string;
  showViewPortfolioModal: () => void;
}
const UserModal: React.FC<UserModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  activeTab,
  showViewPortfolioModal,
}) => {
  const serverUrl = getImageUrl();
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="max-w-[1000px] !w-[90%] lg:!w-[900px]"
    >
      <div className="p-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold  text-center text-secondary-color">
            User Details
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
            See all details about {currentRecord?.name}
          </p>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <div className="border rounded-full">
              <img
                src={currentRecord?.profileImage ? serverUrl + currentRecord?.profileImage : AllImages.profile}
                alt={currentRecord?.name}
                className="w-14 h-14 object-cover rounded-full"
              />
            </div>
            {(activeTab === "professional" && currentRecord?.hasActiveSubscription) && (
              <div className="mt-2 flex items-center gap-1 bg-secondary-color px-2 py-1 rounded-full z-20 shadow-md">
                <img
                  src={AllImages?.batch}
                  width={16}
                  height={16}
                  alt="Frafol Choice Badge"
                  className="size-2.5 sm:size-3 lg:size-4"
                />
                <p className="text-white text-[8px] sm:text-[10px] lg:text-xs font-bold">
                  Frafol Choice
                </p>
              </div>
            )}
            {activeTab === "professional" && (
              <p className="text-xs sm:text-sm lg:text-base flex items-center gap-1">
                <FaStar className="text-yellow-400" /> {currentRecord?.averageRating?.toFixed(1)} ({currentRecord?.totalReview} Reviews)
              </p>
            )}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-secondary-color mt-1">
              {currentRecord?.name}
            </h2>
            {activeTab === "professional" && (
              <div className="">
                <p className="text-sm sm:text-base lg:text-lg mt-1 font-semibold capitalize text-center">
                  {currentRecord?.role === "both" ? "Photographer & Videographer" : currentRecord?.role}
                </p>
              </div>
            )}
          </div>

          <div className="mt-5">
            {activeTab === "professional" ? (
              <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                  <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
                    <span className="font-semibold text-secondary-color">Email:</span>{" "}
                    {currentRecord?.email}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
                    <span className="font-semibold text-secondary-color">Phone Number:</span>{" "}
                    {currentRecord?.phone}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
                    <span className="font-semibold text-secondary-color">Date of Birth:</span>{" "}
                    {formatDate(currentRecord?.dateOfBirth)}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
                    <span className="font-semibold text-secondary-color">
                      Company Name:
                    </span>{" "}
                    {currentRecord?.companyName}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
                    <span className="font-semibold text-secondary-color">Address:</span>{" "}
                    {currentRecord?.address}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
                    <span className="font-semibold text-secondary-color">Country:</span>{" "}
                    {currentRecord?.country}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
                    <span className="font-semibold text-secondary-color">Town:</span>{" "}
                    {currentRecord?.town}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
                    <span className="font-semibold text-secondary-color">Zip Code:</span>{" "}
                    {currentRecord?.zipCode}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
                    <span className="font-semibold text-secondary-color">ICO:</span>{" "}
                    {currentRecord?.ico}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
                    <span className="font-semibold text-secondary-color">DIC:</span>{" "}
                    {currentRecord?.dic}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
                    <span className="font-semibold text-secondary-color">IC DPH:</span>{" "}
                    {currentRecord?.ic_dph}
                  </div>
                </div>
                {currentRecord?.travelTowns?.length as number > 0 && (
                  <div className="text-lg my-5">
                    <span className="font-medium text-secondary-color">
                      Travel Towns:
                    </span>
                    <ul className="text-sm sm:text-base lg:text-lg text-base-color mt-1 p-2 bg-gray-100 rounded-md flex items-center flex-wrap gap-3">
                      {currentRecord?.travelTowns?.map(
                        (specialization, index) => (
                          <li
                            key={index}
                            className="list-none list-inside text-secondary-color"
                          >
                            <span className="text-base-color capitalize">
                              {specialization},
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                <div className="mt-3">
                  <div className="text-lg  ">
                    <span className="font-medium text-secondary-color">About:</span>
                    <div className="text-sm sm:text-base lg:text-lg text-base-color mt-1 p-2 bg-gray-100 rounded-md">
                      <span>
                        {currentRecord?.profileId?.about}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-lg flex items-center justify-start gap-2">
                    <span className="font-medium text-secondary-color">
                      Hourly Rate:
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg text-secondary-color mt-1 p-1.5 bg-gray-100 rounded-md font-extrabold">
                      {currentRecord
                        ? ` ${currentRecord.minHourlyRate}€ - ${currentRecord.maxHourlyRate}€`
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-lg  mt-3">
                <div className="text-lg grid grid-cols-1 bg-secondary-color/5 p-3 rounded lg:grid-cols-2 mt-3">
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Company Name:</span>
                    <span>{currentRecord?.companyName}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Email:</span>
                    <span>{currentRecord?.email}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Phone:</span>
                    <span>{currentRecord?.phone}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Date of Birth:</span>
                    <span>{formatDate(currentRecord?.dateOfBirth)}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Location:</span>
                    <span>{currentRecord?.address}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Town:</span>
                    <span>{currentRecord?.town}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Country:</span>
                    <span>{currentRecord?.country}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Zip Code:</span>
                    <span>{currentRecord?.zipCode}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">ICO:</span>
                    <span>{currentRecord?.ico}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">DIC:</span>
                    <span>{currentRecord?.dic}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">IC DPH:</span>
                    <span>{currentRecord?.ic_dph}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {
            activeTab === "professional" && (
              <div className="flex justify-center items-center mt-5">
                <ReuseButton
                  variant="secondary"
                  onClick={() => showViewPortfolioModal()}
                >
                  View Portfolio
                </ReuseButton>
              </div>
            )
          }
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
