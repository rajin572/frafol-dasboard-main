import React from "react";
import ReuseTable from "../../utils/ReuseTable";

// Define the type for the props
interface NotificationTableProps {
  data: unknown[]; // Replace `any` with the actual type of your data array
  loading: boolean;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

const NotificationTable: React.FC<NotificationTableProps> = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "#UID",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      key: "_id",
    },
    {
      title: "Recipient",
      dataIndex: "recipient", // Data key for recipient
      key: "recipient",
    },
    {
      title: "Notification",
      dataIndex: "message", // Data key for message
      key: "message",
    },
    {
      title: "Channel",
      dataIndex: "channel", // Data key for channel
      key: "channel",
    },
    {
      title: "Status",
      dataIndex: "status", // Data key for status
      key: "status",
    },
    {
      title: "Date",
      dataIndex: "date", // Data key for date
      key: "date",
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
      keyValue={"email"}
    />
  );
};

export default NotificationTable;
