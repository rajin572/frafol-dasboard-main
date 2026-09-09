import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Tooltip } from "antd";
import ReuseButton from "../Button/ReuseButton";
import { IWorkshopDelivery } from "../../types/workshopDelivery.type";
import { formatDate } from "../../utils/dateFormet";

interface AdminWorkshopDeliveryTableProps {
  data: IWorkshopDelivery[];
  loading: boolean;
  showViewPaymentModal: (record: IWorkshopDelivery) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

const AdminWorkshopDeliveryTable: React.FC<AdminWorkshopDeliveryTableProps> = ({
  data,
  loading,
  setPage,
  showViewPaymentModal,
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
      render: (_: unknown, record: IWorkshopDelivery) =>
        record?.clientId?.name || "—",
    },
    {
      title: "Instructor",
      key: "instructor",
      render: (_: unknown, record: IWorkshopDelivery) =>
        record?.instructorId?.name || "—",
    },
    {
      title: "Bank Name",
      key: "bankName",
      render: (_: unknown, record: IWorkshopDelivery) =>
        record?.instructorId?.profileId?.bankName || "—",
    },
    {
      title: "Account Number",
      key: "accountNumber",
      render: (_: unknown, record: IWorkshopDelivery) =>
        record?.instructorId?.profileId?.accountNumber || "—",
    },
    {
      title: "Workshop",
      key: "workshop",
      render: (_: unknown, record: IWorkshopDelivery) =>
        record?.workshopId?.title || "—",
    },
    {
      title: "Date",
      key: "date",
      render: (_: unknown, record: IWorkshopDelivery) =>
        record?.workshopId?.date
          ? formatDate(record.workshopId.date)
          : "—",
    },
    {
      title: "Workshop Status",
      key: "workshopStatus",
      render: (_: unknown, record: IWorkshopDelivery) => {
        const date = record?.workshopId?.date;
        if (!date) return <span className="text-gray-400">—</span>;

        const workshopDate = new Date(date);
        const now = new Date();

        // Compare only the date part (ignore time)
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
      title: "Amount",
      key: "amount",
      render: (_: unknown, record: IWorkshopDelivery) =>
        `${record?.instructorPayment?.amount ?? record?.workshopId?.price ?? 0}€`,
    },
    {
      title: "Client Payment",
      key: "paymentStatus",
      render: (_: unknown, record: IWorkshopDelivery) => (
        <span
          className={`font-medium capitalize ${record?.paymentStatus === "completed"
            ? "text-green-600"
            : "text-yellow-600"
            }`}
        >
          {record?.paymentStatus || "—"}
        </span>
      ),
    },
    {
      title: "Instructor Payment",
      key: "instructorPayment",
      render: (_: unknown, record: IWorkshopDelivery) => (
        <span
          className={`font-medium capitalize ${record?.instructorPayment?.status === "received"
            ? "text-success"
            : "text-error"
            }`}
        >
          {record?.instructorPayment?.status === "received" ? "Paid" : "Unpaid"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IWorkshopDelivery) => (
        <div>
          {record?.instructorPayment?.status === "pending" ? (
            <Tooltip placement="right" title="Pay Instructor">
              <ReuseButton
                variant="secondary"
                className="!p-1 !bg-warning !border-none !text-primary-color cursor-pointer !w-full !text-sm"
                onClick={() => showViewPaymentModal(record)}
              >
                Make Payment
              </ReuseButton>
            </Tooltip>
          ) : (
            <ReuseButton
              variant="outline"
              className="!p-1 !border !border-success !text-success !cursor-default !w-full !text-sm"
            >
              Paid
            </ReuseButton>
          )}
        </div>
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

export default AdminWorkshopDeliveryTable;
