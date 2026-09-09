import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import { useDeleteFeedbackMutation, useGetFeedbackQuery } from "../../redux/features/feedback/feedbackApi";
import { IFeedback } from "../../types";
import FeedbackTable from "../../ui/Tables/FeedbackTable";
import AdminViewFeedbackModal from "../../ui/Modal/Feadback/AdminViewFeedbackModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import DeleteModal from "../../ui/Modal/DeleteModal";

const AdminAllFeedback = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, isFetching } = useGetFeedbackQuery(
    {
      limit,
      page,
      searchTerm: searchText,
    },
    { refetchOnMountOrArgChange: true, pollingInterval: 600000 }
  );

  const allFeedback: IFeedback[] = data?.data?.result || [];
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const total = data?.data?.meta?.total || 0;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IFeedback | null>(null);

  const showViewUserModal = (record: IFeedback) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record: IFeedback) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };


  const handleDelete = async (data: IFeedback) => {
    const response = await tryCatchWrapper(deleteFeedback, {
      params: data?._id,
    });

    if (response?.statusCode === 200) {
      handleCancel();
    }
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center py-2 mb-5">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-base-color font-extrabold ">
          Feedback
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <FeedbackTable
        data={allFeedback}
        loading={isFetching}
        showViewModal={showViewUserModal}
        showDeleteModal={showDeleteModal}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
      />
      <AdminViewFeedbackModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminAllFeedback;
