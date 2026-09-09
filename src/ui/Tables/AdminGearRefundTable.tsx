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
        record?.clientId?.name || record?.userId?.name || "N/A",
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
        record?.userId?.profileId?.bankName ||
        record?.sellerId?.profileId?.bankName ||
        "N/A",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      render: (_: unknown, record: IRefundManagement) =>
        record?.clientId?.profileId?.accountNumber ||
        record?.userId?.profileId?.accountNumber ||
        record?.sellerId?.profileId?.accountNumber ||
        "N/A",
    },
    {
      title: "Refund Amount",
      dataIndex: "refundAmount",
      key: "refundAmount",
      render: (_: unknown, record: IRefundManagement) => {
        if (record?.refundAmount) {
          return `${record.refundAmount}€`;
        }
        const gear = record?.gearMarketplaceId;
        if (gear) {
          const totalAmount =
            (gear.price || 0) +
            (gear.totalVatAmount || 0) +
            (gear.shippingCompany?.price || 0);
          return `${totalAmount}€`;
        }
        return `${record?.price || 0}€`;
      },
    },
    {
      title: "Refund Date",
      dataIndex: "refundDate",
      key: "refundDate",
      render: (_: unknown, record: IRefundManagement) =>
        record?.refundDate || record?.deliveryDate
          ? new Date(
              (record.refundDate || record.deliveryDate) as string
            ).toLocaleDateString()
          : "N/A",
    },
    {
      title: "Refund Status",
      dataIndex: "refundStatus",
      key: "refundStatus",
      render: (_: unknown, record: IRefundManagement) => {
        const status = record?.refundStatus || record?.status || "pending";
        const isRefunded = status === "refunded" || status === "completed";
        const isDeclined = status === "declined";

        return (
          <span
            className={`${
              isRefunded
                ? "text-success"
                : isDeclined
                ? "text-error"
                : "text-warning"
            } font-semibold capitalize`}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_: unknown, record: IRefundManagement) => {
        const isRefunded =
          record?.paymentStatus === "Refunded" ||
          record?.refundStatus === "refunded";
        return (
          <span
            className={`${isRefunded ? "text-success" : "text-error"} font-semibold`}
          >
            {isRefunded ? "Refunded" : "Pending"}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IRefundManagement) => {
        const isRefunded =
          record?.paymentStatus === "Refunded" ||
          record?.refundStatus === "refunded";

        return (
          <div>
            {!isRefunded ? (
              <Tooltip placement="right" title="Process Refund">
                <ReuseButton
                  variant="secondary"
                  className="!p-0 !bg-warning !border-none !text-primary-color cursor-pointer !w-full !text-sm"
                  onClick={() => showViewRefundModal(record)}
                >
                  Process Refund
                </ReuseButton>
              </Tooltip>
            ) : (
              <ReuseButton
                variant="outline"
                className="!p-0 !border !border-success !text-success !cursor-default !w-full !text-sm"
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
      keyValue={"orderId"}
    />
  );
};

export default AdminGearRefundTable;
