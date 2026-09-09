import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { AllImages } from "../../../public/images/AllImages";
import { getImageUrl } from "../../helpers/config/envConfig";
import { IGear } from "../../types";

// Define the type for the props
interface AdminGearMarketplaceTableProps {
  data: IGear[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IGear) => void; // Function to handle viewing a user
  showDeleteModal: (record: IGear) => void; // Function to handle viewing payment details
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminGearMarketplaceTable: React.FC<AdminGearMarketplaceTableProps> = ({
  data,
  loading,
  setPage,
  showViewModal,
  showDeleteModal,
  page,
  total,
  limit,
}) => {
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
      title: "Item Image",
      dataIndex: "gallery",
      key: "gallery",
      render: (text: string[]) => (
        <img
          src={text?.[0] ? serverUrl + text?.[0] : AllImages.cover}
          alt="Item"
          width={50}
          height={50}
          className="rounded w-10 h-10 object-cover"
        />
      ),
      fixed: "left",
    },

    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Item Category",
      dataIndex: ["categoryId", "title"],
      key: "categoryId",
    },
    {
      title: "Seller Name",
      dataIndex: ["authorId", "name"],
      key: "authorId",
    },
    {
      title: "Seller Role",
      dataIndex: ["authorId", "role"],
      key: "authorId",
      render: (_: unknown, record: IGear) => (
        <p className="capitalize">
          {record?.authorId?.role === "both"
            ? "Photographer & Videographer"
            : record?.authorId?.role}
        </p>
      ),
    },
    {
      title: "Item Price (€)",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "VAT Amount (%)",
      dataIndex: "vatAmount",
      key: "vatAmount",
      align: "center",
    },
    {
      title: "Item Price After Adding Service Charges & VAT (€)",
      dataIndex: "mainPrice",
      key: "mainPrice",
      align: "center",
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      render: (text: string) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Shipping Info",
      dataIndex: ["shippingCompany", "name"],
      key: "shippingCompany",
      render: (_: unknown, record: IGear) => (
        <span className="capitalize">
          {record?.shippingCompany?.name} - €{record?.shippingCompany?.price}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IGear) => (
        <Space size="middle">
          {" "}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none cursor-pointer"
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
      keyValue={"orderId"}
    />
  );
};

export default AdminGearMarketplaceTable;
