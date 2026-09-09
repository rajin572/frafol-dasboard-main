import { useState } from "react";
import { Modal } from "antd";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import AdminManagementTable from "../../ui/Tables/AdminManagementTable";
import AddAdminModal from "../../ui/Modal/AdminManagement/AddAdminModal";
import EditAdminModal from "../../ui/Modal/AdminManagement/EditAdminModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import {
  useGetAllAdminsQuery,
  useDeleteAdminMutation,
} from "../../redux/features/adminManagement/adminManagementApi";
import { IAdmin } from "../../types";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import useUserData from "../../hooks/useUserData";
import { formatDate } from "../../utils/dateFormet";

const AdminManagement = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;

  const userData = useUserData();

  const { data, isFetching } = useGetAllAdminsQuery(
    { page, limit, searchTerm: searchText },
    { refetchOnMountOrArgChange: true }
  );

  const admins: IAdmin[] = data?.data || [];
  const total = data?.meta?.total || 0;

  const [deleteAdmin] = useDeleteAdminMutation();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IAdmin | null>(null);

  const handleEdit = (record: IAdmin) => {
    setCurrentRecord(record);
    setIsEditOpen(true);
  };

  const handleDeleteOpen = (record: IAdmin) => {
    setCurrentRecord(record);
    setIsDeleteOpen(true);
  };

  const handleView = (record: IAdmin) => {
    setCurrentRecord(record);
    setIsViewOpen(true);
  };

  const handleCancel = () => {
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setIsViewOpen(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (record: IAdmin) => {
    const res = await tryCatchWrapper(
      deleteAdmin,
      { params: record._id },
      "Deleting admin..."
    );
    if (res?.statusCode === 200) {
      handleCancel();
    }
  };

  return (
    <div className="bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold">
          Admin Management
        </p>
        <div className="flex items-center gap-3">
          <ReuseSearchInput
            placeholder="Search admins..."
            setSearch={setSearchText}
            setPage={setPage}
          />
          <ReuseButton
            variant="secondary"
            className="!py-3 !px-5 !text-base w-fit"
            onClick={() => setIsAddOpen(true)}
          >
            + Add Admin
          </ReuseButton>
        </div>
      </div>

      <AdminManagementTable
        data={admins}
        loading={isFetching}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
        currentUserId={userData?.userId}
        onEdit={handleEdit}
        onDelete={handleDeleteOpen}
        onView={handleView}
      />

      {/* Add Admin */}
      <AddAdminModal open={isAddOpen} onCancel={() => setIsAddOpen(false)} />

      {/* Edit Admin */}
      <EditAdminModal
        open={isEditOpen}
        onCancel={handleCancel}
        record={currentRecord}
      />

      {/* Delete confirmation */}
      <DeleteModal
        isDeleteModalVisible={isDeleteOpen}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
      />

      {/* View Detail Modal */}
      <Modal
        open={isViewOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        className="!w-[90%] max-w-[700px]!"
      >
        <div className="p-5">
          <h3 className="text-2xl font-bold text-center text-secondary-color mb-1">
            Admin Details
          </h3>
          <p className="text-sm text-center text-[#989898] mb-6">
            {currentRecord?.name}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-secondary-color/5 rounded-lg p-4">
            <div>
              <span className="font-semibold text-secondary-color">Name: </span>
              <span className="text-sm">
                {currentRecord?.name} {currentRecord?.sureName || ""}
              </span>
            </div>
            <div>
              <span className="font-semibold text-secondary-color">Email: </span>
              <span className="text-sm">{currentRecord?.email}</span>
            </div>
            <div>
              <span className="font-semibold text-secondary-color">Phone: </span>
              <span className="text-sm">{currentRecord?.phone || "—"}</span>
            </div>
            <div>
              <span className="font-semibold text-secondary-color">Role: </span>
              <span className="text-sm capitalize">
                {currentRecord?.role === "super-admin" ? "Super Admin" : "Admin"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-secondary-color">Created: </span>
              <span className="text-sm">{formatDate(currentRecord?.createdAt)}</span>
            </div>
            <div>
              <span className="font-semibold text-secondary-color">Address: </span>
              <span className="text-sm">{currentRecord?.address || "—"}</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-secondary-color mb-2">
              Accessible Routes:
            </p>
            {currentRecord?.allowedRoutes?.includes("all") ? (
              <span className="text-green-600 font-medium">All Routes</span>
            ) : currentRecord?.allowedRoutes?.length ? (
              <div className="flex flex-wrap gap-2">
                {currentRecord.allowedRoutes.map((r) => (
                  <span
                    key={r}
                    className="bg-secondary-color/10 text-secondary-color px-2 py-1 rounded text-xs capitalize"
                  >
                    {r.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-400 text-sm">No routes assigned</span>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminManagement;
