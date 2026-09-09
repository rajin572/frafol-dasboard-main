/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../../utils/ReuseTable";
import { formatDate, formetTime } from "../../../utils/dateFormet";
import { IWorkshop } from "../../../types";
import { Link } from "react-router-dom";

// Define the type for the props
interface WorkshopApprovalsTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewUserModal: (record: any) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const WorkshopApprovalsTable: React.FC<WorkshopApprovalsTableProps> = ({
  data,
  loading,
  showViewUserModal,
  setPage,
  page,
  total,
  limit,
}) => {
  console.log(data)
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Price (€)", dataIndex: "price", key: "price" },
    {
      title: "Price After Adding Service Fee & VAT (€)",
      dataIndex: "mainPrice",
      key: "mainPrice",
      align: "center",
    },
    { title: "Max Participant", dataIndex: "maxParticipant", key: "maxParticipant" },
    { title: "VAT (%)", dataIndex: "vatPercent", key: "vatPercent" },
    { title: "Host Name", dataIndex: ["authorId", "name"], key: "authorId" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => formatDate(text),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text: string) => formetTime(text),
    },
    { title: "Location Type", dataIndex: "locationType", key: "locationType" },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (_: unknown, record: IWorkshop) =>
        record?.locationType === "online" ? (
          <Link to={record?.workshopLink} target="_blank">
            {record?.workshopLink}
          </Link>
        ) : (
          record?.location
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
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

export default WorkshopApprovalsTable;
