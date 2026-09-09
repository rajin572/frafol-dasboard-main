import { Space, Tooltip } from "antd";
import React from "react";
import ReuseTable from "../../../utils/ReuseTable";
import { formatDate } from "../../../utils/dateFormet";
import { IGearOrder } from "../../../types";
import { gearOrderStatus } from "../../../utils/budgetLabels";
import { IoMdEye } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

// Define the type for the props
interface GearOrderManagementTableProps {
  data: IGearOrder[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IGearOrder) => void; // Function to handle viewing payment details
  showCancleModal: (record: IGearOrder) => void; // Function to handle viewing payment details
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const GearOrderManagementTable: React.FC<GearOrderManagementTableProps> = ({
  data,
  loading,
  setPage,
  showViewModal,
  showCancleModal,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      fixed: "left",
    },
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Seller Name",
      dataIndex: ["sellerId", "name"],
      key: "sellerId",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Item Name",
      dataIndex: ["gearMarketplaceId", "name"],
      key: ["gearMarketplaceId", "name"],
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => formatDate(text),
    },
    {
      title: "Amount",
      dataIndex: ["gearMarketplaceId", "mainPrice"],
      key: "amount",
    },
    {
      title: "Shipping Details",
      dataIndex: ["gearMarketplaceId", "shippingCompany"],
      key: "shippingDetails",
      render: (shippingCompany: { name: string; price: number }) =>
        `${shippingCompany.name} - $${shippingCompany.price}`,
    },

    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (_: string, record: IGearOrder) => {
        return (
          gearOrderStatus[record?.orderStatus as string] || record?.orderStatus
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IGearOrder) => (
        <Space size="middle">
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <IoMdEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          {record?.orderStatus !== "cancelled" &&
            record?.orderStatus !== "delivered" && (
              <Tooltip placement="right" title="Cancel">
                <button
                  className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
                  onClick={() => showCancleModal(record)}
                >
                  <MdOutlineCancel style={{ fontSize: "24px" }} />
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
      keyValue={"orderId"}
    />
  );
};

export default GearOrderManagementTable;
