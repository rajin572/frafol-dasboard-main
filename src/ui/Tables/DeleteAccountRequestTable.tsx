import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { IDeleteAccountRequest } from "../../types";

interface Props {
  data: IDeleteAccountRequest[];
  loading: boolean;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
  onView: (record: IDeleteAccountRequest) => void;
  onApprove: (record: IDeleteAccountRequest) => void;
  onReject: (record: IDeleteAccountRequest) => void;
}

const DeleteAccountRequestTable: React.FC<Props> = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
  onView,
  onApprove,
  onReject,
}) => {
  const columns = [
    {
      title: "ID",
      key: "id",
      render: (_: unknown, __: IDeleteAccountRequest, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Name",
      key: "name",
      render: (_: unknown, record: IDeleteAccountRequest) =>
        `${record.name || ""} ${record.sureName || ""}`.trim(),
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
      title: "Reason",
      dataIndex: "deleteRequestReason",
      key: "deleteRequestReason",
      render: (reason: string) => (
        <span className="line-clamp-2 max-w-[200px] block">
          {reason || "—"}
        </span>
      ),
    },
    {
      title: "Requested On",
      dataIndex: "deleteRequestedAt",
      key: "deleteRequestedAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "deleteRequestStatus",
      key: "deleteRequestStatus",
      render: (status: string) => (
        <span
          className={`capitalize font-medium ${
            status === "approved"
              ? "text-green-600"
              : status === "rejected"
                ? "text-red-600"
                : "text-yellow-600"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (_: unknown, record: IDeleteAccountRequest) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => onView(record)}
            >
              <GoEye style={{ fontSize: "22px" }} />
            </button>
          </Tooltip>

          {record.deleteRequestStatus === "pending" && (
            <>
              <Tooltip title="Approve">
                <button
                  className="!p-0 !bg-transparent !border-none !text-green-600 cursor-pointer"
                  onClick={() => onApprove(record)}
                >
                  <FaCheck style={{ fontSize: "18px" }} />
                </button>
              </Tooltip>

              <Tooltip title="Reject">
                <button
                  className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
                  onClick={() => onReject(record)}
                >
                  <MdClose style={{ fontSize: "22px" }} />
                </button>
              </Tooltip>
            </>
          )}
        </Space>
      ),
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
    />
  );
};

export default DeleteAccountRequestTable;
