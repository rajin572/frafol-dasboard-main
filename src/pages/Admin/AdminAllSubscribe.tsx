/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetSubscribeQuery } from "../../redux/features/subscribe/subscribeApi";
import AdminAllSubscribeTable from "../../ui/Tables/AdminAllSubscribeTable";
import ReuseButton from "../../ui/Button/ReuseButton";
import SendEmailToSubsModal from "../../ui/Modal/Subscription/SendEmailToSubsModal";

const AdminAllSubscribe = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [isOpenModalVisible, setIsOpenModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);


  const { data, isFetching } = useGetSubscribeQuery(
    {
      limit,
      page,
    },
    { refetchOnMountOrArgChange: true, pollingInterval: 600000 }
  );

  const allSubs: any[] = data?.data?.subscribers || [];

  const total = data?.data?.meta?.total || 0;


  const showModal = (record: any) => {
    setIsOpenModalVisible(true);
    setCurrentRecord(record);
  }

  const handleCancel = () => {
    setIsOpenModalVisible(false);
    setCurrentRecord(null);
  }

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center py-2 mb-5">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-base-color font-extrabold ">
          All Subscribers
        </p>
        <div className="flex justify-end mb-5 !w-fit ml-auto">
          <ReuseButton
            variant="secondary"
            className="!-w-fit"
            onClick={() => showModal(allSubs)}
          >
            Send Email
          </ReuseButton>
        </div>

      </div>
      <AdminAllSubscribeTable
        data={allSubs}
        loading={isFetching}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
      />
      <SendEmailToSubsModal isAddModalVisible={isOpenModalVisible} handleCancel={handleCancel} currentRecord={currentRecord} />
    </div>
  );
};

export default AdminAllSubscribe;
