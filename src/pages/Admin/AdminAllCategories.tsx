/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableTabs from "../../ui/ReusableTabs";
import AdminPhotoCategoryTable from "../../ui/Tables/Category/AdminPhotoCategoryTable";
import AdminVideoCategoryTable from "../../ui/Tables/Category/AdminVideoCategoryModal";
import AdminGearCategoryTable from "../../ui/Tables/Category/AdminGearCategoryTable";
import AdminAddCategories from "../../ui/Modal/Categories/AdminAddCategories";
import AdminEditCategories from "../../ui/Modal/Categories/AdminEditCategories";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryOrderMutation, // Add this mutation
} from "../../redux/features/category/categoryApi";
import { Form } from "antd";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminAllCategories = () => {
  const [form] = Form.useForm();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategoryOrder] = useUpdateCategoryOrderMutation(); // Add this
  const [items, setItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"photoGraphy" | "videoGraphy" | "gear">("photoGraphy");

  const limit = 99999;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, isFetching } = useGetCategoryQuery(
    {
      path: activeTab,
    },
    {
      refetchOnMountOrArgChange:
        activeTab === "photoGraphy" ||
          activeTab === "videoGraphy" ||
          activeTab === "gear"
          ? true
          : false,
    }
  );

  const categoryData = data?.data;

  console.log(categoryData);

  useEffect(() => {
    if (categoryData) {
      setItems(categoryData);
    }
  }, [categoryData]);

  const filteredData = items?.filter((item: any) => {
    return item?.title?.toLowerCase().includes(searchText.toLowerCase());
  });

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
    const response = await tryCatchWrapper(deleteCategory, {
      params: { id: data?._id },
    });

    if (response?.statusCode === 200) {
      handleCancel();
    }
  };

  // Handle reorder with order swap
  const handleReorder = async (swappedData: any[]) => {
    console.log("Swapped data:", swappedData);

    // Update local state
    setItems(swappedData);

    // Prepare data for backend - only send items with updated orders
    const categories = swappedData.map((item, index) => ({
      _id: item._id,
      order: index + 1, // New order based on position (1-indexed)
    }));

    console.log("Sending to backend:", { categories });

    // Call API to update order
    try {
      const response = await tryCatchWrapper(updateCategoryOrder, {
        body: {
          categories: categories,
          type: activeTab, // Send the category type
        },
      });

      if (response?.statusCode === 200) {
        console.log("Order updated successfully");
      }
    } catch (error) {
      console.error("Failed to update order:", error);
      // Optionally revert the changes if API fails
      if (categoryData) {
        setItems(categoryData);
      }
    }
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Categories
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
          Add Category
        </ReuseButton>
      </div>
      <ReusableTabs<"photoGraphy" | "videoGraphy" | "gear">
        align="left"
        tabs={[
          {
            label: "Photography",
            value: "photoGraphy",
            content: (
              <AdminPhotoCategoryTable
                data={filteredData}
                loading={isFetching}
                showEditModal={showEditModal}
                showDeleteModal={showDeleteModal}
                setPage={setPage}
                page={page}
                total={filteredData?.length}
                limit={limit}
                onReorder={handleReorder}
              />
            ),
          },
          {
            label: "Videography",
            value: "videoGraphy",
            content: (
              <AdminVideoCategoryTable
                data={filteredData}
                loading={isFetching}
                showEditModal={showEditModal}
                showDeleteModal={showDeleteModal}
                setPage={setPage}
                page={page}
                total={filteredData?.length}
                limit={limit}
                onReorder={handleReorder}
              />
            ),
          },
          {
            label: "Gear",
            value: "gear",
            content: (
              <AdminGearCategoryTable
                data={filteredData}
                loading={isFetching}
                showEditModal={showEditModal}
                showDeleteModal={showDeleteModal}
                setPage={setPage}
                page={page}
                total={filteredData?.length}
                limit={limit}
                onReorder={handleReorder}
              />
            ),
          },
        ]}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSearchText("");
          form.resetFields();
          setPage(1);
        }}
      />

      <AdminAddCategories
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
        activeTab={activeTab}
      />
      <AdminEditCategories
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        activeTab={activeTab}
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

export default AdminAllCategories;