import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import SubscriptionTransactionTable from "../../ui/Tables/SubscriptionTransactionTable";
import SubscriptionTransactionViewModal from "../../ui/Modal/Transactions/SubscriptionTransactionViewModal";
import { useGetEarningsQuery } from "../../redux/features/earning/earningApi";
import { ITransaction } from "../../types";

const AdminAllSubscriptionTransaction = () => {
    const limit = 12;
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<ITransaction | null>(null);

    const { data, isFetching } = useGetEarningsQuery(
        { limit, page, searchTerm: searchText, paymentType: "subscription" },
        { refetchOnMountOrArgChange: true, pollingInterval: 600000 }
    );

    const total = data?.data?.meta?.total || 0;
    const payments: ITransaction[] = data?.data?.orders || [];

    const showViewModal = (record: ITransaction) => {
        setCurrentRecord(record);
        setIsViewModalVisible(true);
    };

    const handleCancel = () => {
        setIsViewModalVisible(false);
        setCurrentRecord(null);
    };

    return (
        <div className="bg-primary-color rounded-xl p-4 min-h-[90vh]">
            <div className="flex justify-between items-center mx-3 py-2 mb-5">
                <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold">
                    Subscription Earnings
                </p>
                <div className="h-fit">
                    <ReuseSearchInput
                        placeholder="Search ..."
                        setSearch={setSearchText}
                        setPage={setPage}
                    />
                </div>
            </div>

            <SubscriptionTransactionTable
                data={payments}
                loading={isFetching}
                showViewModal={showViewModal}
                setPage={setPage}
                page={page}
                total={total}
                limit={limit}
            />

            <SubscriptionTransactionViewModal
                isViewModalVisible={isViewModalVisible}
                handleCancel={handleCancel}
                currentRecord={currentRecord}
            />
        </div>
    );
};

export default AdminAllSubscriptionTransaction;
