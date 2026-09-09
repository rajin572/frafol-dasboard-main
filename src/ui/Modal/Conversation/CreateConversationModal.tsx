import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseSearchInput from "../../Form/ReuseSearchInput";
import { useState } from "react";
import { useCreateConversationMutation } from "../../../redux/features/conversation/conversationApi";
import { useGetAllTypeOfUsersQuery } from "../../../redux/features/users/usersApi";
import SpinLoader from "../../SpinLoader";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { AllImages } from "../../../../public/images/AllImages";

interface IChatUser {
    _id: string;
    name: string;
    email: string;
    profileImage: string;
    role: string
}


interface CreateConversationModalProps {
    isAddModalVisible: boolean;
    handleCancel: () => void;
}

const CreateConversationModal: React.FC<CreateConversationModalProps> = ({
    isAddModalVisible,
    handleCancel,
}) => {
    const serverUrl = getImageUrl();
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<IChatUser | null>(null);

    const { data, isFetching } = useGetAllTypeOfUsersQuery({ searchTerm: searchText }, { skip: !isAddModalVisible, refetchOnMountOrArgChange: true });


    const allUsers: IChatUser[] = data?.data?.result || [];

    const [addConversation] = useCreateConversationMutation();

    const onSubmit = async () => {
        const formattedValues = {
            users: [selectedUsers?._id],
        };

        const res = await tryCatchWrapper(
            addConversation,
            { body: formattedValues },
            "Creating Conversation..."
        );

        if (res?.statusCode === 201) {
            form.resetFields();
            handleCancel();
        }
    };

    return (
        <Modal
            open={isAddModalVisible}
            onCancel={handleCancel}
            footer={null}
            centered
            className="lg:!w-[600px]"
        >
            <div className="p-5 text-base-color">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5 text-secondary-color">
                    Create Conversation
                </h1>
                <div className="max-w-[350px]">
                    <h3 className="text-xs sm:text-sm lg:text-base font-semibold mb-1">Search Users</h3>
                    <ReuseSearchInput
                        placeholder="Search ..."
                        setSearch={setSearchText}
                        setPage={() => { }}
                    />
                </div>
                <ReusableForm form={form} handleFinish={onSubmit}>
                    {
                        isFetching ? (
                            <div className="my-5">
                                <SpinLoader />
                            </div>
                        ) : <div className="mt-5 space-y-3">
                            {
                                allUsers?.map((user: IChatUser) => (
                                    <div onClick={() => setSelectedUsers(user)} key={user?._id} className={`${selectedUsers?._id === user?._id ? "bg-secondary-color/30" : ""} flex items-center gap-3 p-1 cursor-pointer rounded`}>
                                        <img
                                            src={user?.profileImage ? serverUrl + user?.profileImage : AllImages.profile}
                                            alt={user?.name}
                                            className="w-10 h-10 object-cover rounded-full"
                                        />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-sm font-semibold">{user?.name}</h3>
                                                <p className="text-xs text-white bg-secondary-color py-0.2 px-1 rounded-2xl">{user?.role === "both" ? "PhotoGrapher & VideoGrapher" : user?.role}</p>
                                            </div>
                                            <p className="text-xs">{user?.email}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }

                    <div className="flex justify-between gap-3 mt-6">
                        <ReuseButton htmlType="submit" variant="secondary">
                            Create Conversation
                        </ReuseButton>
                    </div>
                </ReusableForm>
            </div>
        </Modal >
    );
};

export default CreateConversationModal;
