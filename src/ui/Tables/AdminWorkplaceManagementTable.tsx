import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import { IWorkshop } from "../../types";
import { getImageUrl } from "../../helpers/config/envConfig";
import { AllImages } from "../../../public/images/AllImages";
import { formatDate, formetTime } from "../../utils/dateFormet";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";

// Define the type for the props
interface AdminWorkplaceManagementTableProps {
  data: IWorkshop[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showDeleteModal: (record: IWorkshop) => void; // Function to handle viewing payment details
  showViewModal: (record: IWorkshop) => void;
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminWorkplaceManagementTable: React.FC<
  AdminWorkplaceManagementTableProps
> = ({ data, loading, setPage, showDeleteModal, showViewModal, page, total, limit }) => {
  const serverUrl = getImageUrl();
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
      fixed: "left",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: string[]) => (
        <img
          src={text ? serverUrl + text : AllImages.cover}
          alt="Item"
          width={50}
          height={50}
          className="rounded w-10 h-10 object-cover"
        />
      ),
      fixed: "left",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      width: 300,
    },
    { title: "Price (€)", dataIndex: "price", key: "price" },
    {
      title: "Price After Adding Service Fee & VAT (€)",
      dataIndex: "mainPrice",
      key: "mainPrice",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <p className="line-clamp-2">{text}</p>
      ),
      width: 300,
    },
    {
      title: "Hosted By",
      dataIndex: "authorId",
      key: "authorId",
      render: (_: unknown, record: IWorkshop) => (
        <div className="flex items-center gap-2 mt-3">
          <img
            width={1000}
            height={1000}
            src={
              record?.authorId?.profileImage
                ? serverUrl + record?.authorId?.profileImage
                : AllImages?.profile
            }
            alt="user"
            className="w-8 h-8 object-cover rounded-full "
          />
          <p className="text-xs sm:text-sm lg:text-base">
            {record?.authorId?.name}
          </p>
        </div>
      ),
    },
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
    {
      title: "Location Type",
      dataIndex: "locationType",
      key: "locationType",
    },
    {
      title: "Location",
      dataIndex: "locationType",
      key: "locationType",
      render: (_: unknown, currentRecord: IWorkshop) =>
        currentRecord?.locationType === "online" ? (
          <Link
            to={currentRecord?.workshopLink}
            className="text-xs sm:text-sm lg:text-base font-semibold"
          >
            {currentRecord?.workshopLink}
          </Link>
        ) : (
          <p className="text-xs sm:text-sm lg:text-base font-semibold">
            {currentRecord?.location}
          </p>
        ),
    },
    {
      title: "Total Participants",
      dataIndex: "totalParticipants",
      key: "totalParticipants",
    },
    {
      title: "Max Participants",
      dataIndex: "maxParticipant",
      key: "maxParticipant",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IWorkshop) => (
        <Space>
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          <Tooltip placement="right" title="Delete">
            <button
              className="!p-0 !bg-transparent !border-none !text-error-color"
              onClick={() => showDeleteModal(record)}
            >
              <MdDelete
                className="!text-secondary-color cursor-pointer"
                style={{ fontSize: "24px" }}
              />
            </button>
          </Tooltip>
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
      keyValue={"orderId"}
    />
  );
};

export default AdminWorkplaceManagementTable;
