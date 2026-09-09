/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Tooltip } from "antd";
import ReuseButton from "../Button/ReuseButton";
import { IRefundManagement } from "../../types/refundManagement.type";

interface AdminGearRefundTableProps {
  data: IRefundManagement[];
  loading: boolean;
  showViewRefundModal: (record: IRefundManagement) => void;
  setPage?: (page: number) => void;
  page?: number;
  total?: number;
  limit?: number;
}

const AdminGearRefundTable: React.FC<AdminGearRefundTableProps> = ({
  data,
  loading,
  setPage,
  showViewRefundModal,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (_: unknown, record: any) =>
        record?.clientId?.name || record?.name || record?.userId?.name || "N/A",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      render: (_: unknown, record: IRefundManagement) =>
        record?.gearMarketplaceId?.name || record?.serviceType || "N/A",
    },
    {
      title: "Seller Name",
      dataIndex: "sellerName",
      key: "sellerName",
      render: (_: unknown, record: IRefundManagement) =>
        record?.sellerId?.name || record?.serviceProviderId?.name || "N/A",
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
      render: (_: unknown, record: IRefundManagement) =>
        record?.clientId?.profileId?.bankName ||
        record?.sellerId?.profileId?.bankName ||
        record?.userId?.profileId?.bankName ||
        record?.clientId?.bankName ||
        record?.sellerId?.bankName ||
        (typeof record?.paymentId === "object" && record?.paymentId?.paymentMethod
          ? String(record.paymentId.paymentMethod).toUpperCase()
          : "—"),
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      render: (_: unknown, record: IRefundManagement) =>
        record?.clientId?.profileId?.accountNumber ||
        record?.sellerId?.profileId?.accountNumber ||
        record?.userId?.profileId?.accountNumber ||
        record?.clientId?.accountNumber ||
        record?.sellerId?.accountNumber ||
        record?.clientId?.profileId?.iban ||
        record?.sellerId?.profileId?.iban ||
        "—",
    },
    {
      title: "Amount",
      key: "amount",
      render: (_: unknown, record: IRefundManagement) => {
        const gear = record?.gearMarketplaceId;
        if (gear?.mainPrice !== undefined && gear?.mainPrice !== null) {
          const shipping = gear?.shippingCompany?.price || 0;
          return `${Number((gear.mainPrice + shipping).toFixed(2))}€`;
        }
        if (record?.totalPrice !== undefined && record?.totalPrice !== null) {
          return `${record.totalPrice}€`;
        }
        if (record?.refundAmount !== undefined && record?.refundAmount !== null) {
          return `${record.refundAmount}€`;
        }
        if (gear?.price !== undefined && gear?.price !== null) {
          const totalAmount =
            (gear.price || 0) +
            (gear.totalVatAmount || 0) +
            (gear.shippingCompany?.price || 0);
          return `${Number(totalAmount.toFixed(2))}€`;
        }
        if (record?.price !== undefined && record?.price !== null) {
          return `${record.price}€`;
        }
        return "N/A";
      },
    },
    {
      title: "Cancelled Date",
      key: "cancelledDate",
      render: (_: unknown, record: IRefundManagement) => {
        const dateStr =
          record?.cancelApprovalDate ||
          record?.statusTimestamps?.cancelledAt ||
          record?.statusHistory?.find((s: any) => s?.status === "cancelled")?.changedAt ||
          record?.refundDate ||
          record?.updatedAt ||
          record?.createdAt;
        return dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";
      },
    },
    {
      title: "Cancel Reason",
      key: "cancelReason",
      render: (_: unknown, record: IRefundManagement) => {
        const reason = record?.cancelReason || record?.reason || "Cancelled";
        return (
          <Tooltip title={reason}>
            <span className="truncate max-w-[130px] inline-block text-sm text-gray-500">
              {reason}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => {
        const isReceivedOrPaid =
          status?.toLowerCase() === "received" ||
          status?.toLowerCase() === "paid" ||
          status?.toLowerCase() === "refunded";
        return (
          <span
            className={`${
              isReceivedOrPaid ? "text-success" : "text-error"
            } font-semibold capitalize`}
          >
            {status || "pending"}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IRefundManagement) => {
        const isRefunded =
          record?.paymentStatus?.toLowerCase() === "received" ||
          record?.paymentStatus?.toLowerCase() === "paid" ||
          record?.paymentStatus?.toLowerCase() === "refunded";

        return (
          <div>
            {!isRefunded ? (
              <Tooltip placement="right" title="Process Refund">
                <ReuseButton
                  variant="secondary"
                  className="!p-1 !bg-warning !border-none !text-primary-color cursor-pointer !w-full !text-sm"
                  onClick={() => showViewRefundModal(record)}
                >
                  Process Refund
                </ReuseButton>
              </Tooltip>
            ) : (
              <ReuseButton
                variant="outline"
                className="!p-1 !border !border-success !text-success !cursor-default !w-full !text-sm"
              >
                Refunded
              </ReuseButton>
            )}
          </div>
        );
      },
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
      keyValue={(record: IRefundManagement) => record?._id || record?.orderId}
    />
  );
};

export default AdminGearRefundTable;
