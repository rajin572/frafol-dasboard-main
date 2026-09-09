/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AdminGearMarketplaceTable from "../../ui/Tables/AdminGearMarketplaceTable";
import {
  useDeleteGearMutation,
  useGetAllGearQuery,
} from "../../redux/features/gear/gearApi";
import { IGear } from "../../types";
import ViewGearMarketplaceModal from "../../ui/Modal/GearMarketplace/ViewGearMarketplaceModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminGearMarketplacePage = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const [searchText, setSearchText] = useState("");

  const [deleteGear] = useDeleteGearMutation();

  const { data, isFetching } = useGetAllGearQuery(
    {
      limit,
      page,
      searchTerm: searchText,
    },
    { refetchOnMountOrArgChange: true, pollingInterval: 600000 }
  );

  const gearMarketplaceData: IGear[] = data?.data?.result || [];

  const [isViewModal, setIsViewModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewModal = (record: IGear) => {
    setIsViewModal(true);
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    setIsViewModal(false);
    setCurrentRecord(null);
  };

  const showDeleteModal = (data: IGear) => {
    setIsDeleteModal(true);
    setCurrentRecord(data);
  };

  const handleDelete = async (data: IGear) => {
    const res = await tryCatchWrapper(
      deleteGear,
      {
        params: data._id,
      },
      "Deleting gear..."
    );
    if (res?.success) {
      setIsDeleteModal(false);
    }
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Gear Marketplace
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <AdminGearMarketplaceTable
        data={gearMarketplaceData}
        loading={isFetching}
        showViewModal={showViewModal}
        showDeleteModal={showDeleteModal}
        setPage={setPage}
        page={page}
        total={gearMarketplaceData.length}
        limit={limit}
      />
      <DeleteModal<IGear>
        isDeleteModalVisible={isDeleteModal}
        handleCancel={() => setIsDeleteModal(false)}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
      />
      <ViewGearMarketplaceModal
        isViewModalVisible={isViewModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminGearMarketplacePage;
