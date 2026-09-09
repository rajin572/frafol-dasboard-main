import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { IUser } from "../../types";

// Define the type for the props
interface AllUserTableProps {
  data: IUser[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IUser) => void; // Function to handle viewing a user
  showBlockModal: (record: IUser) => void; // Function to handle blocking a user
  showUnblockModal: (record: IUser) => void; // Function to handle unblocking a user
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AllUserTable: React.FC<AllUserTableProps> = ({
  data,
  loading,
  showViewModal,
  showBlockModal,
  showUnblockModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_: IUser, __: IUser, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: IUser) => (
        <span>
          {text} {record.sureName || ""}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <span className="capitalize">{role}</span>,
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Photography/Videography Orders",
      dataIndex: "photoVideoOrders",
      key: "photoVideoOrders",
      render: (_: IUser, record: IUser) => {
        const count =
          (record.photographerSpecializations?.length || 0) +
          (record.videographerSpecializations?.length || 0);
        return count;
      },
    },
    {
      title: "Gear Orders",
      dataIndex: "gearOrders",
      key: "gearOrders",
      render: (gearOrders: IUser[]) => gearOrders?.length || 0,
    },
    {
      title: "Total Spent",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (val: number) => `$${val?.toLocaleString() || 0}`,
    },
    {
      title: "Workshops Joined",
      dataIndex: "workshopsJoined",
      key: "workshopsJoined",
      render: (workshops: IUser[]) => workshops?.length || 0,
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "status",
      render: (isBlocked: boolean) => (
        <span
          className={`font-medium ${
            isBlocked ? "text-red-600" : "text-green-600"
          }`}
        >
          {isBlocked ? "Blocked" : "Active"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IUser) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          {/* Block User Tooltip */}
          {record?.isBlocked ? (
            <Tooltip placement="left" title="Unblock this User">
              <button
                className="!p-0 !bg-transparent !border-none !text-base-color !cursor-pointer"
                onClick={() => showUnblockModal(record)}
              >
                <CgUnblock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          ) : (
            <Tooltip placement="left" title="Block this User">
              <button
                className="!p-0 !bg-transparent !border-none !text-error-color !cursor-pointer"
                onClick={() => showBlockModal(record)}
              >
                <MdBlock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          )}
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
      keyValue={"email"}
    />
  );
};

export default AllUserTable;
