import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Tooltip } from "antd";
import ReuseButton from "../Button/ReuseButton";
import { IWorkshopRefund } from "../../types/refundManagement.type";
import { formatDate } from "../../utils/dateFormet";

interface AdminWorkshopRefundTableProps {
  data: IWorkshopRefund[];
  loading: boolean;
  showViewRefundModal: (record: IWorkshopRefund) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

const AdminWorkshopRefundTable: React.FC<AdminWorkshopRefundTableProps> = ({
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
      title: "UID",
      key: "uid",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Client Name",
      key: "clientName",
      render: (_: unknown, record: IWorkshopRefund) =>
        record?.clientId?.name || "—",
    },
    {
      title: "Instructor",
      key: "instructor",
      render: (_: unknown, record: IWorkshopRefund) =>
        record?.instructorId?.name || "—",
    },
    {
      title: "Bank Name",
      key: "bankName",
      render: (_: unknown, record: IWorkshopRefund) =>
        record?.clientId?.profileId?.bankName ||
        record?.instructorId?.profileId?.bankName ||
        "—",
    },
    {
      title: "Account Number",
      key: "accountNumber",
      render: (_: unknown, record: IWorkshopRefund) =>
        record?.clientId?.profileId?.accountNumber ||
        record?.instructorId?.profileId?.accountNumber ||
        "—",
    },
    {
      title: "Workshop",
      key: "workshop",
      render: (_: unknown, record: IWorkshopRefund) =>
        record?.workshopId?.title || "—",
    },
    {
      title: "Date",
      key: "date",
      render: (_: unknown, record: IWorkshopRefund) =>
        record?.workshopId?.date ? formatDate(record.workshopId.date) : "—",
    },
    {
      title: "Workshop Status",
      key: "workshopStatus",
      render: (_: unknown, record: IWorkshopRefund) => {
        const date = record?.workshopId?.date;
        if (!date) return <span className="text-gray-400">—</span>;

        const workshopDate = new Date(date);
        const now = new Date();

        const workshopDay = new Date(
          workshopDate.getFullYear(),
          workshopDate.getMonth(),
          workshopDate.getDate()
        );
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );

        if (workshopDay > today) {
          return (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
              Upcoming
            </span>
          );
        } else if (workshopDay.getTime() === today.getTime()) {
          return (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
              Running
            </span>
          );
        } else {
          return (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
              Completed
            </span>
          );
        }
      },
    },
    {
      title: "Refund Amount",
      key: "amount",
      render: (_: unknown, record: IWorkshopRefund) =>
        `${
          record?.refundAmount ??
          record?.refundPayment?.amount ??
          record?.workshopId?.price ??
          0
        }€`,
    },
    {
      title: "Client Payment",
      key: "paymentStatus",
      render: (_: unknown, record: IWorkshopRefund) => (
        <span
          className={`font-medium capitalize ${
            record?.paymentStatus === "completed"
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {record?.paymentStatus || "—"}
        </span>
      ),
    },
    {
      title: "Refund Status",
      key: "refundStatus",
      render: (_: unknown, record: IWorkshopRefund) => {
        const isRefunded =
          record?.refundStatus === "refunded" ||
          record?.refundPayment?.status === "received" ||
          record?.refundPayment?.status === "refunded";

        return (
          <span
            className={`font-medium capitalize ${
              isRefunded ? "text-success" : "text-error"
            }`}
          >
            {isRefunded ? "Refunded" : "Pending"}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IWorkshopRefund) => {
        const isRefunded =
          record?.refundStatus === "refunded" ||
          record?.refundPayment?.status === "received" ||
          record?.refundPayment?.status === "refunded";

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
      keyValue={"_id"}
    />
  );
};

export default AdminWorkshopRefundTable;
