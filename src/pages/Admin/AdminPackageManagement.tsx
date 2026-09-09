/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import {
  useDeletePackageMutation,
  useGetAllPackageQuery,
} from "../../redux/features/package/packageApi";
import { IPackage } from "../../types";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import ViewPackageManagementModal from "../../ui/Modal/PackageManagement/ViewPackageManagementModal";
import AdminPackageManagementTable from "../../ui/Tables/AdminPackageManagementTable";

const AdminPackageManagement = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const [searchText, setSearchText] = useState("");

  const [deletePackage] = useDeletePackageMutation();

  const { data, isFetching } = useGetAllPackageQuery(
    {
      limit,
      page,
      searchTerm: searchText,
    },
    { refetchOnMountOrArgChange: true, pollingInterval: 600000 }
  );

  const packageData: IPackage[] = data?.data?.result || [];

  const total = data?.data?.meta?.total || 0;

  const [isViewModal, setIsViewModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewModal = (record: IPackage) => {
    setIsViewModal(true);
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    setIsViewModal(false);
    setCurrentRecord(null);
  };

  const showDeleteModal = (data: IPackage) => {
    setIsDeleteModal(true);
    setCurrentRecord(data);
  };

  const handleDelete = async (data: IPackage) => {
    const res = await tryCatchWrapper(
      deletePackage,
      {
        params: data._id,
      },
      "Deleting package..."
    );
    if (res?.success) {
      setIsDeleteModal(false);
    }
  };
  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Package Management
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <AdminPackageManagementTable
        data={packageData}
        loading={isFetching}
        showViewModal={showViewModal}
        showDeleteModal={showDeleteModal}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
      />
      <ViewPackageManagementModal
        isViewModalVisible={isViewModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <DeleteModal<any>
        isDeleteModalVisible={isDeleteModal}
        handleCancel={() => setIsDeleteModal(false)}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AdminPackageManagement;
