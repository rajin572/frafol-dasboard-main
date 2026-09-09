/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Image, Space, Tooltip } from "antd";
import ReuseTable from "../../../utils/ReuseTable";
import { MdDelete, MdEdit } from "react-icons/md";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { AllImages } from "../../../../public/images/AllImages";
import { HolderOutlined } from "@ant-design/icons";

// Define the type for the props
interface AdminVideoCategoryTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showEditModal: (record: any) => void; // Function to handle viewing a user
  showDeleteModal: (record: any) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
  onReorder?: (newData: any[]) => void; // New prop for reordering
}

const AdminVideoCategoryTable: React.FC<AdminVideoCategoryTableProps> = ({
  data,
  loading,
  showEditModal,
  showDeleteModal,
  setPage,
  page,
  total,
  limit,
  onReorder,
}) => {
  const serverUrl = getImageUrl();

  const columns = [
    {
      title: "",
      key: "drag",
      width: 50,
      render: () => (
        <HolderOutlined
          style={{
            cursor: "move",
            fontSize: "16px",
            color: "#999",
          }}
        />
      ),
    },
    {
      title: "UID",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <Image
          src={image ? serverUrl + image : AllImages.cover}
          alt="Category"
          style={{ width: "75px", height: "75px" }}
          className="object-cover"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Subtitle",
      dataIndex: "subTitle",
      key: "subTitle",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="Edit">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showEditModal(record)}
            >
              <MdEdit style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          <Tooltip placement="right" title="Delete">
            <button
              className="!p-0 !bg-transparent !border-none !text-error cursor-pointer"
              onClick={() => showDeleteModal(record)}
            >
              <MdDelete style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"_id"}
      draggable={true}
      onDragEnd={onReorder}

    />
  );
};

export default AdminVideoCategoryTable;
