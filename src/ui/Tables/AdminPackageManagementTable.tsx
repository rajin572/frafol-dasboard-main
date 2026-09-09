import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tooltip } from "antd";
import { IPackage } from "../../types";
import { GoEye } from "react-icons/go";
import { MdDelete } from "react-icons/md";

// Define the type for the props
interface AdminPackageManagementTableProps {
  data: IPackage[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IPackage) => void;
  showDeleteModal: (record: IPackage) => void; // Function to handle viewing payment details
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminPackageManagementTable: React.FC<
  AdminPackageManagementTableProps
> = ({
  data,
  loading,
  setPage,
  showViewModal,
  showDeleteModal,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
      fixed: "left",
    },
    { title: "Package Title", dataIndex: "title", key: "title", fixed: "left" },
    { title: "Price (€)", dataIndex: "price", key: "price", align: "center" },
    {
      title: "Price After Adding Service Fee & VAT (€)",
      dataIndex: "mainPrice",
      key: "mainPrice",
      align: "center",
    },
    {
      title: "VAT (%)",
      dataIndex: "vatAmount",
      key: "vatAmount",
      align: "center",
    },
    {
      title: "Professional Name",
      dataIndex: ["authorId", "name"],
      key: "authorId",
    },
    {
      title: "Professional Role",
      dataIndex: ["authorId", "role"],
      key: "authorId",
      render: (_: unknown, record: IPackage) => (
        <p className="capitalize">
          {record?.authorId?.role === "both"
            ? "Photographer & Videographer"
            : record?.authorId?.role}
        </p>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text: string) => <span className="capitalize">{text}</span>,
    },

    {
      title: "Delivery Time",
      dataIndex: "deliveryTime",
      key: "deliveryTime",
      render: (text: number) => `${text / 7} weeks`,
    },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IPackage) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          <Tooltip placement="right" title="Delete">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
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
      keyValue={"orderId"}
    />
  );
};

export default AdminPackageManagementTable;
