/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { ITransaction } from "../../types";

interface SubscriptionTransactionTableProps {
  data: ITransaction[];
  loading: boolean;
  showViewModal: (record: ITransaction) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

const SubscriptionTransactionTable: React.FC<SubscriptionTransactionTableProps> = ({
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
      key: "id",
      render: (_: any, __: any, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Subscriber Name",
      key: "name",
      render: (_: any, record: ITransaction) => record?.userId?.name || "—",
    },
    {
      title: "Email",
      key: "email",
      render: (_: any, record: ITransaction) => record?.userId?.email || "—",
    },
    {
      title: "Subscription Days",
      key: "subscriptionDays",
      render: (_: any, record: ITransaction) =>
        record?.subscriptionDays ? `${record.subscriptionDays} days` : "—",
    },
    {
      title: "Amount",
      key: "amount",
      render: (_: any, record: ITransaction) =>
        `${record?.amount?.toFixed(2)}€`,
    },
    {
      title: "Method",
      dataIndex: "paymentMethod",
      key: "method",
      render: (method: string) => <span className="capitalize">{method}</span>,
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => (
        <span
          className={`capitalize font-medium ${status === "completed"
            ? "text-green-600"
            : status === "failed"
              ? "text-red-600"
              : "text-yellow-600"
            }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (_: unknown, record: ITransaction) => (
        <Space size="middle">
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

export default SubscriptionTransactionTable;
