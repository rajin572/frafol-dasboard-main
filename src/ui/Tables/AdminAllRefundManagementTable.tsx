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
      dataIndex: "userId",
      key: "clientName",
      render: (_: unknown, record: IRefundManagement) =>
        record?.userId?.name || record?.clientId?.name || "N/A",
    },
    {
      title: "Bank Name",
      key: "bankName",
      render: (_: unknown, record: IRefundManagement) =>
        record?.userId?.profileId?.bankName ||
        record?.serviceProviderId?.profileId?.bankName ||
        "N/A",
    },
    {
      title: "Bank Account Number",
      key: "accountNumber",
      render: (_: unknown, record: IRefundManagement) =>
        record?.userId?.profileId?.accountNumber ||
        record?.serviceProviderId?.profileId?.accountNumber ||
        "N/A",
    },
    {
      title: "Photographer/Videographer",
      dataIndex: "serviceProviderId",
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
      title: "Refund Amount",
      dataIndex: "refundAmount",
      key: "refundAmount",
      render: (_: unknown, record: IRefundManagement) =>
        `${record?.refundAmount ?? record?.price ?? 0}€`,
    },
    {
      title: "Refund Date",
      dataIndex: "refundDate",
      key: "refundDate",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "N/A",
    },
    {
      title: "Refund Status",
      dataIndex: "refundStatus",
      key: "refundStatus",
      render: (status: string) => {
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
            {status || "Pending"}
          </span>
        );
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => {
        const isRefunded =
          status === "Refunded" || status === "Paid" || status === "completed";
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
        const isAlreadyRefunded =
          record?.refundStatus === "refunded" ||
          record?.paymentStatus === "Refunded";

        return (
          <div>
            {!isAlreadyRefunded ? (
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
