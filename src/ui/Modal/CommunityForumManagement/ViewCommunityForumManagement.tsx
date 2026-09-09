import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { ICommunityPost } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { formatDateTime } from "../../../utils/dateFormet";

interface ViewCommunityForumManagementProps {
    isViewModalVisible: boolean;
    handleCancel: () => void;
    currentRecord: ICommunityPost | null;
}

const ViewCommunityForumManagement: React.FC<
    ViewCommunityForumManagementProps
> = ({
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
                <div className="p-5">
                    <div className="mt-10 rounded-xl border border-background-color">
                        <div className=" p-4 border-b border-background-color flex justify-between items-center">
                            <div>
                                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">
                                    {currentRecord?.title}
                                </h1>
                                <div className="flex items-center gap-5">
                                    <p className="text-xs sm:text-sm lg:text-base  mt-4">
                                        Posted {formatDateTime(currentRecord?.createdAt as string)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-start gap-2 ">
                            <div className="text-xs sm:text-sm lg:text-base p-1 flex flex-col items-center gap-2 min-w-28">
                                <img
                                    draggable={false}
                                    src={
                                        currentRecord?.authorId?.profileImage
                                            ? serverUrl + currentRecord?.authorId?.profileImage
                                            : AllImages?.profile
                                    }
                                    alt="user"
                                    className="w-10 h-10 object-cover rounded-full "
                                />
                                <p className="text-xs sm:text-sm lg:text-base font-bold">
                                    {currentRecord?.authorId?.name}
                                </p>
                            </div>
                            <div className="p-5 lg:border-l lg:border-background-color">
                                <img
                                    src={
                                        currentRecord?.images?.[0]
                                            ? serverUrl + currentRecord?.images?.[0]
                                            : AllImages?.cover
                                    }
                                    alt="user"
                                    className="w-full lg:w-1/2 mx-auto h-auto object-cover rounded-lg mb-10"
                                />
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: currentRecord?.text as string,
                                    }}
                                ></div>
                            </div>{" "}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    };

export default ViewCommunityForumManagement;
