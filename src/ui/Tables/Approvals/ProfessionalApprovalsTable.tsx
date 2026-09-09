import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../../utils/ReuseTable";
import { IProfessional } from "../../../types";

// Define the type for the props
interface ProfessionalApprovalsTableProps {
  data: IProfessional[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewUserModal: (record: IProfessional) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const ProfessionalApprovalsTable: React.FC<ProfessionalApprovalsTableProps> = ({
  data,
  loading,
  showViewUserModal,
  setPage,
  page,
  total,
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
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) =>
        role === "both"
          ? "Photographer/Videographer"
          : role === "photographer"
            ? "Photographer"
            : "Videographer",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
      width: 300,
      render: (_: unknown, record: IProfessional) =>
        record.role === "both"
          ? [
            record?.photographerSpecializations?.join(", "),
            record?.videographerSpecializations?.join(", "),
          ].join(" , ")
          : record.role === "photographer"
            ? record?.photographerSpecializations?.join(", ")
            : record?.videographerSpecializations?.join(", "),
    },
    { title: "Hourly Rate", dataIndex: "hourlyRate", key: "hourlyRate", render: (_: unknown, record: IProfessional) => `${record?.minHourlyRate}€ - ${record?.maxHourlyRate}€` },
    { title: "Location", dataIndex: "address", key: "address" },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IProfessional) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewUserModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
      ),
      align: "center",
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

export default ProfessionalApprovalsTable;
