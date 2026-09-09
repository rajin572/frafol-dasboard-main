import React, { useState } from "react";
import { Modal } from "antd";
import { IWorkshop } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { AllImages } from "../../../../public/images/AllImages";
import { IoCalendarOutline } from "react-icons/io5";
import { formatDate, formetTime } from "../../../utils/dateFormet";
import { LuClock, LuUsers } from "react-icons/lu";
import { FaLink } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import ReuseButton from "../../Button/ReuseButton";
import ViewWorkshopParticipantsModal from "./ViewWorkshopParticipantsModal";

// InitialValues

interface ViewWorkshopManagementModalProps {
    isViewModalVisible: boolean;
    handleCancel: () => void;
    currentRecord: IWorkshop | null;
}

const ViewWorkshopManagementModal: React.FC<ViewWorkshopManagementModalProps> = ({
    isViewModalVisible,
    handleCancel,
    currentRecord,
}) => {
    const serverUrl = getImageUrl();
    const [isParticipantsModalVisible, setIsParticipantsModalVisible] =
        useState(false);

    return (
        <Modal
            open={isViewModalVisible}
            onCancel={handleCancel}
            footer={null}
            centered
            className={"lg:!w-[700px]"}
        >
            <div className="p-1.5 rounded-xl border border-background-color mt-10 relative">
                <img
                    width={1000}
                    height={1000}
                    src={
                        currentRecord?.image
                            ? serverUrl + currentRecord?.image
                            : AllImages?.cover
                    }
                    alt="workspace"
                    className="w-full h-80 sm:h-60 lg:h-72 xl:h-80 object-cover rounded-lg "
                />
                <div className="flex items-center justify-between gap-2 absolute top-2  w-full px-2">
                    {currentRecord?.vatAmount as number > 0 ? (
                        <span className="text-xs sm:text-sm bg-secondary-color text-primary-color py-0.5 px-1.5 rounded-full ">
                            VAT Included: {currentRecord?.vatAmount}%
                        </span>
                    ) : (
                        <span></span>
                    )}
                </div>
                <div className="px-1">
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold mt-3">
                        {currentRecord?.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs sm:text-sm lg:text-base font-semibold">
                            {currentRecord?.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        <img
                            width={1000}
                            height={1000}
                            src={
                                currentRecord?.authorId?.profileImage
                                    ? serverUrl + currentRecord?.authorId?.profileImage
                                    : AllImages?.profile
                            }
                            alt="user"
                            className="w-8 h-8 object-cover rounded-full "
                        />
                        <p className="text-xs sm:text-sm lg:text-base font-bold">
                            {currentRecord?.authorId?.name}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <IoCalendarOutline className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                        <p className="text-xs sm:text-sm lg:text-base font-semibold">
                            {formatDate(currentRecord?.date)}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <LuClock className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                        <p className="text-xs sm:text-sm lg:text-base font-semibold">
                            {formetTime(currentRecord?.time)}
                        </p>
                    </div>

                    {currentRecord?.locationType === "online" ? (
                        <div className="flex items-center gap-2 mt-1">
                            <FaLink className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                            <p className="text-xs sm:text-sm lg:text-base font-semibold">
                                {currentRecord?.workshopLink}
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 mt-1">
                            <MdLocationPin className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                            <p className="text-xs sm:text-sm lg:text-base font-semibold">
                                {currentRecord?.location}
                            </p>
                        </div>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                        <LuUsers className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                        <p className="text-xs sm:text-sm lg:text-base font-semibold">
                            {currentRecord?.totalParticipants} / {currentRecord?.maxParticipant} participants
                        </p>
                    </div>
                    <div className="flex items-center gap-2 mt-5 justify-between">
                        <p className="text-base sm:text-lg lg:text-xl font-semibold">
                            {currentRecord?.mainPrice}€
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <ReuseButton
                    variant="secondary"
                    className="!py-2.5 !text-sm !w-full"
                    onClick={() => setIsParticipantsModalVisible(true)}
                >
                    View Participants
                </ReuseButton>
            </div>

            <ViewWorkshopParticipantsModal
                isModalVisible={isParticipantsModalVisible}
                handleCancel={() => setIsParticipantsModalVisible(false)}
                workshopId={currentRecord?._id}
                workshopTitle={currentRecord?.title}
            />
        </Modal>
    );
};

export default ViewWorkshopManagementModal;
