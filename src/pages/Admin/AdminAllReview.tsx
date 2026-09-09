/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import reviewData from "../../../public/data/Review";
import AdminViewReviewModal from "../../ui/Modal/Review/AdminViewReviewModal";

import DeleteModal from "../../ui/Modal/DeleteModal";
import AdminAllReviewTable from "../../ui/Tables/AdminAllReviewTable";

const AdminAllReview = () => {
  const data = reviewData;
  const [page, setPage] = useState(1);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <div
        className=" bg-primary-color rounded-xl"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-secondary-color w-full p-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary-color font-semibold">
              Reviews
            </p>
          </div>
        </div>
        <div className="mt-5 px-4">
          <AdminAllReviewTable
            data={data}
            loading={false}
            showViewModal={showViewUserModal}
            showDeleteModal={showDeleteModal}
            setPage={setPage}
            page={page}
            total={data.length}
            limit={limit}
          />
          <AdminViewReviewModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
          <DeleteModal
            isDeleteModalVisible={isDeleteModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
            handleDelete={() => handleDelete(currentRecord as any)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAllReview;
