/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Switch, Tag, Tooltip } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { useUpdateStatusMutation } from "../../redux/features/coupon/couponApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

// Define the type for the props
interface AdminCouponTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showEditModal: (record: any) => void; // Function to handle viewing a user
  showDeleteModal: (record: any) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminCouponTable: React.FC<AdminCouponTableProps> = ({
  data,
  loading,
  showEditModal,
  showDeleteModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const [updateStatus] = useUpdateStatusMutation();

  const handleStatusChange = async (record: any, checked: boolean) => {
    await tryCatchWrapper(
      updateStatus,
      { body: { status: checked }, params: { id: record?._id } },
      "Updating Status..."
    );
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount",
      dataIndex: "amount",
      key: "amount",
      render: (value: number) => `€${value}`,
    },
    {
      title: "Min Spend",
      dataIndex: "minimumSpend",
      key: "minimumSpend",
      render: (value: number) => `€${value}`,
    },
    {
      title: "Usage",
      key: "usage",
      render: (_: any, record: any) => (
        <span>{`${record.usedCount}/${record.limit}`}</span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: any) => {
        const isExpired =
          new Date(record.expiryDate).getTime() < new Date().getTime();

        const status = isExpired
          ? "Expired"
          : record.isActive
          ? "Active"
          : "Inactive";

        const color =
          status === "Active" ? "green" : status === "Expired" ? "red" : "gray";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Expiry",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (value: string) =>
        value
          ? new Date(value).toLocaleDateString("en-GB") // dd/mm/yyyy
          : "No Expiry",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (value: boolean, record: any) => (
        <Switch
          checked={value as boolean}
          onChange={(checked) => handleStatusChange(record, checked)}
        />
      ),
      align: "center",
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
      keyValue={"id"}
    />
  );
};

export default AdminCouponTable;
