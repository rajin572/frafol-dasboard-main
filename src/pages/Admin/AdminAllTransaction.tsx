/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import TransactionTable from "../../ui/Tables/TransactionTable";
import TransactionViewModal from "../../ui/Modal/Transactions/TransactionViewModal";
import { useGetEarningsQuery } from "../../redux/features/earning/earningApi";
import ReuseSelect from "../../ui/Form/ReuseSelect";

const AdminAllTransaction = () => {
  const limit = 12;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("event");

  const { data, isFetching } = useGetEarningsQuery(
    {
      limit,
      page,
      searchTerm: searchText,
      paymentType: type,
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 600000
    }
  );

  const total = data?.data?.meta?.total || 0;
  const payments: any = data?.data?.orders || [];

  console.log("Payment Page ==>", payments);


  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  console.log(data)
  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Commission  Earnings
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <ReuseSelect
        name=""
        options={[
          { label: "Event", value: "event" },
          { label: "Gear", value: "gear" },
          { label: "Workshop", value: "workshop" },
        ]}
        onChange={(e) => setType(e)}
        value={type}
        selectClassName="!w-[160px]"
      />
      <TransactionTable
        data={payments}
        loading={isFetching}
        showViewModal={showViewUserModal}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
      />
      <TransactionViewModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminAllTransaction;
