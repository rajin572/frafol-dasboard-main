import { useState } from "react";
import CommunityForumManagementTable from "../../ui/Tables/CommunityForumManagementTable";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewCommunityForumManagement from "../../ui/Modal/CommunityForumManagement/ViewCommunityForumManagement";
import DeleteModal from "../../ui/Modal/DeleteModal";
import { useDeleteCommunityMutation, useGetCommunityQuery } from "../../redux/features/communityForum/communityForumApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { ICommunityPost } from "../../types";


const CommunityForumManagement = () => {

    const [deleteCommunityForum] = useDeleteCommunityMutation();

    const limit = 12;
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    const { data, isFetching } = useGetCommunityQuery(
        {
            limit,
            page,
            searchTerm: searchText,
        },
        { refetchOnMountOrArgChange: true, pollingInterval: 600000 }
    );

    const allCommunity: ICommunityPost[] = data?.data?.result || [];
    const total = data?.data?.meta?.total || 0;

    console.log(allCommunity)

    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<ICommunityPost | null>(null);

    const showViewUserModal = (record: ICommunityPost) => {
        setCurrentRecord(record);
        setIsViewModalVisible(true);
    };

    const showDeleteModal = (record: ICommunityPost) => {
        setCurrentRecord(record);
        setIsDeleteModalVisible(true);
    };


    const handleCancel = () => {
        setIsViewModalVisible(false);
        setIsDeleteModalVisible(false);
        setCurrentRecord(null);
    };

    const handleDelete = async (
        record: ICommunityPost | null,
    ) => {
        const res = await tryCatchWrapper(
            deleteCommunityForum,
            {
                params: record?._id,
            },
            "Deleting..."
        );
        if (res?.statusCode === 200) {
            handleCancel();
        }
    };

    return (
        <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
            <div className="flex justify-between items-center mx-3 py-2 mb-5">
                <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
                    Community Forum
                </p>
                <div className="h-fit">
                    <ReuseSearchInput
                        placeholder="Search ..."
                        setSearch={setSearchText}
                        setPage={setPage}
                    />
                </div>
            </div>
            <CommunityForumManagementTable
                data={allCommunity || []}
                loading={isFetching}
                showViewModal={showViewUserModal}
                showDeleteModal={showDeleteModal}
                setPage={setPage}
                page={page}
                total={total}
                limit={limit}
            />
            <ViewCommunityForumManagement
                isViewModalVisible={isViewModalVisible}
                handleCancel={handleCancel}
                currentRecord={currentRecord}
            />
            <DeleteModal<ICommunityPost>
                isDeleteModalVisible={isDeleteModalVisible}
                handleCancel={handleCancel}
                currentRecord={currentRecord}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default CommunityForumManagement;
