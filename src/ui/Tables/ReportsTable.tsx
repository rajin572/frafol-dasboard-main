/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { Link } from "react-router-dom";

// Define the type for the props
interface ReportsTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const ReportsTable: React.FC<ReportsTableProps> = ({
  data,
  loading,
  showViewModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "UID",
      dataIndex: "id",
      key: "id",
      render: (_: any, __: any, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "userId",
      key: "role",
      render: (user: any) => {
        return user?.role === "both"
          ? "Photographer & Videographer"
          : user?.role || "—";
      },
    },
    {
      title: "illegal content report",
      dataIndex: "reason",
      key: "reason",
      width: 300,
      render: (reason: string) => <p>{reason?.length > 100 ? `${reason?.slice(0, 100)}...` : reason}</p>
    },
    {
      title: "Has Attachment",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <p>{image?.length > 0 ? "Yes" : "No"}</p>

    },
    {
      title: "Website URL",
      dataIndex: "url",
      key: "url",
      render: (url: string) => <Link to={url} target="_blank">{url?.length > 50 ? `${url?.slice(0, 50)}...` : url}</Link>

    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: 300,
      render: (message: string) => <p>{message?.length > 100 ? `${message?.slice(0, 100)}...` : message}</p>

    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(), // Format date nicely
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
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

export default ReportsTable;
