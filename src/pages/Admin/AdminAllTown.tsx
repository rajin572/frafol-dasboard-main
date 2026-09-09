/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ReuseButton from "../../ui/Button/ReuseButton";
import { Form } from "antd";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useDeleteTownMutation, useGetTownQuery } from "../../redux/features/town/townApi";
import AdminAddTownModal from "../../ui/Modal/Town/AdminAddTownModal";
import AdminEditTownModal from "../../ui/Modal/Town/AdminEditTown";
import AdminTownTable from "../../ui/Tables/AdminTownTable";

const AdminAllTown = () => {
    const [form] = Form.useForm();
    const [deleteTown] = useDeleteTownMutation();

    const limit = 99999;
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditwModalVisible] = useState(false);

    const [currentRecord, setCurrentRecord] = useState<any | null>(null);

    const { data, isFetching } = useGetTownQuery(
        {
            searchTerm: searchText,
        },
        {
            refetchOnMountOrArgChange: true
        }
    );

    const townData = data?.data;




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
        const response = await tryCatchWrapper(deleteTown, {
            params: { id: data?._id },
        });

        if (response?.statusCode === 200) {
            handleCancel();
        }
    };

    return (
        <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
            <div className="flex justify-between items-center mx-3 py-2 mb-5">
                <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
                    Towns
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
                    Add New Town
                </ReuseButton>
            </div>


            <AdminTownTable
                data={townData}
                loading={isFetching}
                showEditModal={showEditModal}
                showDeleteModal={showDeleteModal}
                setPage={setPage}
                page={page}
                total={townData?.length || 0}
                limit={limit}
            />


            <AdminAddTownModal
                isAddModalVisible={isAddModalVisible}
                handleCancel={handleCancel}
            />
            <AdminEditTownModal
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

export default AdminAllTown;