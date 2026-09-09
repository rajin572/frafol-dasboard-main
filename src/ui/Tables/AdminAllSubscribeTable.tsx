/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { formatDateTime } from "../../utils/dateFormet";

// Define the type for the props
interface AdminAllSubscribeTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminAllSubscribeTable: React.FC<AdminAllSubscribeTableProps> = ({
  data,
  loading,
  setPage,
  page = 1,
  total = 0,
  limit,
}) => {
  const columns = [
    {
      title: "UID",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Email",
      dataIndex: "email", // Assuming "email" contains user info
      key: "email",
    },

    {
      title: "Date",
      dataIndex: "createdAt", // Assuming "createdAt" is the date field
      key: "createdAt",
      render: (createdAt: string) => formatDateTime(createdAt), // Format date
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
      keyValue={"id"}
    />
  );
};

export default AdminAllSubscribeTable;
