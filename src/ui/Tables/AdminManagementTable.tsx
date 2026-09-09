import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { MdDelete, MdEdit } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { IAdmin } from "../../types";

interface Props {
  data: IAdmin[];
  loading: boolean;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
  currentUserId?: string;
  onEdit: (record: IAdmin) => void;
  onDelete: (record: IAdmin) => void;
  onView: (record: IAdmin) => void;
}

const AdminManagementTable: React.FC<Props> = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
  currentUserId,
  onEdit,
  onDelete,
  onView,
}) => {
  const columns = [
    {
      title: "ID",
      key: "id",
      render: (_: unknown, __: IAdmin, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Name",
      key: "name",
      render: (_: unknown, record: IAdmin) =>
        `${record.name} ${record.sureName || ""}`.trim(),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => phone || "—",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <span
          className={`capitalize font-medium ${role === "super-admin" ? "text-secondary-color" : "text-base-color"
            }`}
        >
          {role === "super-admin" ? "Super Admin" : "Admin"}
        </span>
      ),
    },
    {
      title: "Accessible Routes",
      dataIndex: "allowedRoutes",
      key: "allowedRoutes",
      render: (routes: string[]) =>
        routes?.includes("all") ? (
          <span className="text-green-600 font-medium">All Routes</span>
        ) : (
          <span className="text-sm text-gray-500">
            {routes?.length ? `${routes.length} route(s)` : "None"}
          </span>
        ),
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (_: unknown, record: IAdmin) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => onView(record)}
            >
              <GoEye style={{ fontSize: "22px" }} />
            </button>
          </Tooltip>

          <Tooltip title="Edit">
            <button
              className="!p-0 !bg-transparent !border-none !text-blue-500 cursor-pointer"
              onClick={() => onEdit(record)}
            >
              <MdEdit style={{ fontSize: "20px" }} />
            </button>
          </Tooltip>

          {record._id !== currentUserId && (
            <Tooltip title="Delete">
              <button
                className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
                onClick={() => onDelete(record)}
              >
                <MdDelete style={{ fontSize: "20px" }} />
              </button>
            </Tooltip>
          )}
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

export default AdminManagementTable;
