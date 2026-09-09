/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ReuseButton from "../../ui/Button/ReuseButton";
// import {
// //   useDeleteCategoryMutation,
//   useGetCategoryQuery,
// } from "../../redux/features/category/categoryApi";
import { Form } from "antd";
import AdminCouponTable from "../../ui/Tables/AdminCouponTable";
import AdminCreateCuponModal from "../../ui/Modal/AdminCupon/AdminCreateCuponModal";
import AdminUpdateCuponModal from "../../ui/Modal/AdminCupon/AdminUpdateCuponModal";
import {
  useDeleteCouponMutation,
  useGetCouponQuery,
} from "../../redux/features/coupon/couponApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
// import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminAllCupon = () => {
  const [form] = Form.useForm();
  const [deleteCoupon] = useDeleteCouponMutation();

  const limit = 10;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, isFetching } = useGetCouponQuery({
    limit,
    page,
    searchTerm: searchText,
  });

  console.log(data);
  const couponData: any = data?.data?.coupons || [];

  const total = data?.data?.meta?.total || 0;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditwModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditwModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditwModalVisible(false);
    setCurrentRecord(null);
    setIsDeleteModalVisible(false);
    setIsAddModalVisible(false);
  };

  const handleDelete = async (data: any) => {
    const response = await tryCatchWrapper(deleteCoupon, {
      params: { id: data?._id },
    });
    if (response?.statusCode === 200) {
      handleCancel();
    }
    console.log(data);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Coupon
        </p>
        <Form form={form} className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </Form>
      </div>
      <div className="flex justify-end mb-5 !w-fit ml-auto">
        <ReuseButton
          variant="secondary"
          className="!-w-fit"
          onClick={showAddModal}
        >
          Create Coupon
        </ReuseButton>
      </div>

      <AdminCouponTable
        data={couponData}
        loading={isFetching}
        showEditModal={showEditModal}
        showDeleteModal={showDeleteModal}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
      />

      <AdminCreateCuponModal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />
      <AdminUpdateCuponModal
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        handleDelete={() => handleDelete(currentRecord)}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminAllCupon;
