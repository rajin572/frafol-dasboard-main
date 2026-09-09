/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { ITransaction } from "../../types";

interface TransactionTableProps {
  data: ITransaction[];
  loading: boolean;
  showViewModal: (record: ITransaction) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
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
      title: "Order ID",
      key: "orderId",
      render: (_: any, record: ITransaction) => {
        if (record.paymentType === "gear") {
          return record.orderId || record._id.slice(-8).toUpperCase();
        }
        if (
          record.paymentType === "event" &&
          record.eventOrderId &&
          typeof record.eventOrderId !== "string"
        ) {
          return record.eventOrderId.orderId;
        }
        return record._id.slice(-8).toUpperCase();
      },
    },
    {
      title: "Client Name",
      key: "clientName",
      render: (_: any, record: ITransaction) =>
        record?.client?.name || record?.userId?.name || "—",
    },
    {
      title: "Professional Name",
      key: "serviceProviderId",
      render: (_: any, record: ITransaction) =>
        record?.seller?.name || record?.serviceProviderId?.name || "—",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
      render: (type: string) => <span className="capitalize">{type}</span>,
    },
    {
      title: "Method",
      dataIndex: "paymentMethod",
      key: "method",
    },
    {
      title: "Transaction ID",
      key: "transactionId",
      render: (_: any, record: ITransaction) => (
        <p className="line-clamp-1 max-w-[200px]">
          {record?.transactionId?.slice(0, 20)}...
        </p>
      ),
    },
    {
      title: "Service Fee",
      key: "serviceFee",
      render: (_: any, record: ITransaction) => {
        if (record.paymentType === "subscription") return "—";
        if (
          record.paymentType === "event" &&
          record.eventOrderId &&
          typeof record.eventOrderId !== "string"
        ) {
          const fee = (record.eventOrderId.priceWithServiceFee || 0) - (record.eventOrderId.price || 0);
          return `€${fee.toFixed(2)}`;
        }
        if (record.paymentType === "gear" && record.gear) {
          return `€${record.gear.platformCommission.toFixed(2)}`;
        }
        if (
          record.paymentType === "workshop" &&
          record.workshopId &&
          typeof record.workshopId !== "string"
        ) {
          const ws = record.workshopId;
          const fee = ws.mainPrice - ws.price - ws.vatAmount;
          return `€${fee.toFixed(2)}`;
        }
        return "—";
      },
    },
    {
      title: "Amount",
      key: "amount",
      render: (_: any, record: ITransaction) => {
        if (
          record.paymentType === "event" &&
          record.eventOrderId &&
          typeof record.eventOrderId !== "string"
        ) {
          return `€${(record.eventOrderId.totalPrice || 0).toFixed(2)}`;
        }
        if (record.paymentType === "gear" && record.gear) {
          return `€${record.gear.mainPrice.toFixed(2)}`;
        }
        if (
          record.paymentType === "workshop" &&
          record.workshopId &&
          typeof record.workshopId !== "string"
        ) {
          return `€${record.workshopId.mainPrice.toFixed(2)}`;
        }
        return `€${(record?.amount || 0).toFixed(2)}`;
      },
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

export default TransactionTable;
