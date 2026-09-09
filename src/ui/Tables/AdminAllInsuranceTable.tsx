/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { formatDateTime } from "../../utils/dateFormet";
import { getImageUrl } from "../../helpers/config/envConfig";
import { AllImages } from "../../../public/images/AllImages";

// Define the type for the props
interface AdminAllInsuranceTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminAllInsuranceTable: React.FC<AdminAllInsuranceTableProps> = ({
  data,
  loading,
  showViewModal,
  setPage,
  page = 1,
  total = 0,
  limit,
}) => {
  const serverUrl = getImageUrl();
  const columns = [
    {
      title: "UID",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Registered By",
      dataIndex: "userId",
      key: "userId",
      render: (_: unknown, record: any) => (
        <div className="flex items-center gap-2">
          <img
            src={
              record?.userId.profileImage
                ? serverUrl + record?.userId.profileImage
                : AllImages.profile
            }
            alt="Item"
            width={50}
            height={50}
            className="rounded w-10 h-10 object-cover"
          />
          <p>{record?.userId.name}</p>
        </div>
      ),
    },
    {
      title: "Full Name",
      dataIndex: "fullName", // Assuming "fullName" contains user info
      key: "fullName",
      render: (_: unknown, record: any) =>
        `${record?.userId.name} ${record?.userId.sureName}`, // Render user name and surname
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
      title: "Registered At",
      dataIndex: "createdAt", // Assuming "createdAt" is the date field
      key: "createdAt",
      render: (createdAt: string) => formatDateTime(createdAt), // Format date
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showViewModal(record)}
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
      keyValue={"id"}
    />
  );
};

export default AdminAllInsuranceTable;
