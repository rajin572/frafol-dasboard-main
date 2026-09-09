/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../../ui/Form/ReuseSearchInput";
import InteractionMessagesTable from "../../../ui/Tables/InteractionMessagesTable";
import ApprovalModal from "../../../ui/Modal/ApprovalModal";
import DeclineModal from "../../../ui/Modal/DeclineModal";
import {
  useApproveMessageMutation,
  useDeclineMessageMutation,
  useGetInteractionMessagesQuery,
} from "../../../redux/features/interactionManagement/interactionManagementApi";
import { IInteractionMessage } from "../../../types";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const InteractionMessages = () => {
  const [approveMessage] = useApproveMessageMutation();
  const [declineMessage] = useDeclineMessageMutation();
  const limit = 12;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, isFetching } = useGetInteractionMessagesQuery(
    {
      limit,
      page,
      searchTerm: searchText,
    },
    { refetchOnMountOrArgChange: true, pollingInterval: 600000 }
  );

  console.log(data);

  const allMessages: IInteractionMessage[] = data?.data?.result || [];
  const total = data?.data?.meta?.total || 0;

  const payments: any = [];

  console.log(payments);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  console.log(searchText);

  const showApproveUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsApproveModalVisible(true);
  };

  const showDeclineUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeclineModalVisible(true);
  };

  const handleCancel = () => {
    setIsApproveModalVisible(false);
    setIsDeclineModalVisible(false);
    setCurrentRecord(null);
  };

  const handleApprove = async (record: IInteractionMessage) => {
    const res = await tryCatchWrapper(
      approveMessage,
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
    record: IInteractionMessage | null,
    _value: any
  ) => {
    const res = await tryCatchWrapper(
      declineMessage,
      {
        params: record?._id,
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
          Messages
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <InteractionMessagesTable
        data={allMessages}
        loading={isFetching}
        showApproveModal={showApproveUserModal}
        showDeclineModal={showDeclineUserModal}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
      />
      <ApprovalModal
        isApprovalModalVisible={isApproveModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleApprove={handleApprove}
      />
      <DeclineModal
        isDeclineModalVisible={isDeclineModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDecline={handleDecline}
        showInput={false}
      />
    </div>
  );
};

export default InteractionMessages;
