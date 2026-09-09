/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../../ui/Form/ReuseSearchInput";
import InteractionCommunityForumTable from "../../../ui/Tables/InteractionCommunityForumTable";
import ApprovalModal from "../../../ui/Modal/ApprovalModal";
import DeclineModal from "../../../ui/Modal/DeclineModal";
import {
  useApproveCommunityForumMutation,
  useDeclineCommunityForumMutation,
  useGetInteractionCommunityForumQuery,
} from "../../../redux/features/interactionManagement/interactionManagementApi";
import ViewInteractionCommunityModal from "../../../ui/Modal/InteractionManagement/ViewInteractionCommunityModal";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { IInteractionCommunity } from "../../../types";

const InteractionCommunityForum = () => {
  const [approveCommunityForum] = useApproveCommunityForumMutation();
  const [declineCommunityForum] = useDeclineCommunityForumMutation();

  const limit = 12;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, isFetching } = useGetInteractionCommunityForumQuery(
    {
      limit,
      page,
      searchTerm: searchText,
    },
    { refetchOnMountOrArgChange: true, pollingInterval: 600000 }
  );

  const allCommunity: any = data?.data;
  console.log(allCommunity);
  const total = data?.data?.meta?.total || 0;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  console.log(searchText, isViewModalVisible);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showApproveUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsApproveModalVisible(true);
  };

  const showDeclineUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeclineModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsApproveModalVisible(false);
    setIsDeclineModalVisible(false);
    setCurrentRecord(null);
  };

  const handleApprove = async (record: IInteractionCommunity) => {
    const res = await tryCatchWrapper(
      approveCommunityForum,
      {
        params: record?._id,
      },
      "Approving..."
    );

    if (res?.statusCode === 200) {
      handleCancel();
    }
  };
  const handleDecline = async (
    record: IInteractionCommunity | null,
    value: any
  ) => {
    console.log(value)
    const res = await tryCatchWrapper(
      declineCommunityForum,
      {
        params: record?._id,
        body: { reason: value.reason }, // Passing the reason for decline in the body
      },
      "Declining..."
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
      <InteractionCommunityForumTable
        data={allCommunity || []}
        loading={isFetching}
        showViewModal={showViewUserModal}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
      />
      <ViewInteractionCommunityModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        showApproveModal={showApproveUserModal}
        showDeclineModal={showDeclineUserModal}
      />
      <ApprovalModal
        isApprovalModalVisible={isApproveModalVisible}
        handleCancel={() => setIsApproveModalVisible(false)}
        currentRecord={currentRecord}
        handleApprove={handleApprove}
      />
      <DeclineModal
        isDeclineModalVisible={isDeclineModalVisible}
        handleCancel={() => setIsDeclineModalVisible(false)}
        currentRecord={currentRecord}
        handleDecline={handleDecline}
        showInput={true}
      />
    </div>
  );
};

export default InteractionCommunityForum;
