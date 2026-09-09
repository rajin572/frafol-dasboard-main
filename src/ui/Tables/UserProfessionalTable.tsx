/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Rate, Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { IUser } from "../../types";
import { AllImages } from "../../../public/images/AllImages";
import { formatDate } from "../../utils/dateFormet";

// Define the type for the props
interface UserProfessionalTableProps {
  data: IUser[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IUser) => void; // Function to handle viewing a user
  showBlockModal: (record: IUser) => void; // Function to handle blocking a user
  showUnblockModal: (record: IUser) => void; // Function to handle unblocking a user
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const UserProfessionalTable: React.FC<UserProfessionalTableProps> = ({
  data,
  loading,
  showViewModal,
  showBlockModal,
  showUnblockModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_: any, __: any, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: IUser) => (
        <span>
          {text} {record.sureName}
        </span>
      ),
    },
    {
      title: "Frafol Choice",
      dataIndex: "hasActiveSubscription",
      key: "hasActiveSubscription",
      render: (_: string, record: IUser) => (
        <span>
          {record.hasActiveSubscription ?
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-secondary-color">
                <img src={AllImages.batch} alt="" className="w-4 h-4" />
              </div>
              <p>{formatDate(record.subscriptionExpiryDate || "")}</p>
            </div> : "-"}
        </span>
      ),
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <span className="capitalize">
          {role === "both" ? "Photographer & Videographer" : role || "—"}
        </span>
      ),
    },
    {
      title: "Specializations",
      dataIndex: "videographerSpecializations",
      key: "specializations",
      render: (arr: string[]) => (arr?.length ? arr.join(", ") : "—"),
      width: 450,
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Min Hourly Rate",
      dataIndex: "minHourlyRate",
      key: "minHourlyRate",
      render: (val: number) => `€${val.toLocaleString()}`,
    },
    {
      title: "Max Hourly Rate",
      dataIndex: "maxHourlyRate",
      key: "maxHourlyRate",
      render: (val: number) => `€${val.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: string) => (
        <span
          className={`font-medium ${isBlocked ? "text-error" : "text-success"}`}
        >
          {isBlocked ? "Blocked" : "Active"}
        </span>
      ),
    },
    {
      title: "Avg. Rating",
      dataIndex: "averageRating",
      key: "averageRating",
      render: (val: number) => {
        const rating = Number(val.toFixed(1));
        return (<div className="flex items-center"><Rate disabled value={rating} count={5} allowHalf /><p className="ml-2">{rating}</p></div>);
      },
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
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          {/* Block User Tooltip */}
          {record.isBlocked ? (
            <Tooltip placement="left" title="Unblock this User">
              <button
                className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                onClick={() => showUnblockModal(record)}
              >
                <CgUnblock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          ) : (
            <Tooltip placement="left" title="Block this User">
              <button
                className="!p-0 !bg-transparent !border-none !text-error cursor-pointer"
                onClick={() => showBlockModal(record)}
              >
                <MdBlock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          )}
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

export default UserProfessionalTable;
