import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Tooltip } from "antd";
import ReuseButton from "../Button/ReuseButton";
import { IRefundManagement } from "../../types/refundManagement.type";

interface AdminAllRefundManagementTableProps {
  data: IRefundManagement[];
  loading: boolean;
  showViewRefundModal: (record: IRefundManagement) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

const AdminAllRefundManagementTable: React.FC<AdminAllRefundManagementTableProps> = ({
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
      key: "clientName",
      render: (_: unknown, record: IRefundManagement) =>
        record?.userId?.name || record?.name || "N/A",
    },
    {
      title: "Bank Name",
      key: "bankName",
      render: (_: unknown, record: IRefundManagement) =>
        record?.userId?.profileId?.bankName ||
        record?.serviceProviderId?.profileId?.bankName ||
        "—",
    },
    {
      title: "Bank Account Number",
      key: "accountNumber",
      render: (_: unknown, record: IRefundManagement) =>
        record?.userId?.profileId?.accountNumber ||
        record?.serviceProviderId?.profileId?.accountNumber ||
        "—",
    },
    {
      title: "Photographer/Videographer",
      key: "photographer_videographer",
      render: (_: unknown, record: IRefundManagement) =>
        record?.serviceProviderId?.name || "N/A",
    },
    {
      title: "Order Type",
      dataIndex: "orderType",
      key: "orderType",
      render: (text: string) =>
        text ? text.charAt(0).toUpperCase() + text.slice(1) : "Direct",
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (text: string) =>
        text ? text.charAt(0).toUpperCase() + text.slice(1) : "—",
    },
    {
      title: "Amount",
      key: "amount",
      render: (_: unknown, record: IRefundManagement) => {
        if (record?.totalPrice) return `${record.totalPrice}€`;
        if (record?.priceWithServiceFee) return `${record.priceWithServiceFee}€`;
        if (record?.price) return `${record.price}€`;
        if (record?.budget_range) return record.budget_range;
        if (record?.refundAmount) return `${record.refundAmount}€`;
        return "N/A";
      },
    },
    {
      title: "Cancelled Date",
      key: "cancelledDate",
      render: (_: unknown, record: IRefundManagement) => {
        const dateStr =
          record?.statusTimestamps?.cancelledAt ||
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
        const isPaid = status?.toLowerCase() === "paid" || status === "Refunded";
        return (
          <span
            className={`${isPaid ? "text-success" : "text-error"} font-semibold`}
          >
            {isPaid ? "Paid" : "Unpaid"}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IRefundManagement) => {
        const isAlreadyPaidOrRefunded =
          record?.paymentStatus?.toLowerCase() === "paid" ||
          record?.paymentStatus === "Refunded";

        return (
          <div>
            {!isAlreadyPaidOrRefunded ? (
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
      keyValue={"orderId"}
    />
  );
};

export default AdminAllRefundManagementTable;
