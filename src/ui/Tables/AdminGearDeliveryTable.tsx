/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Tooltip } from "antd";
import ReuseButton from "../Button/ReuseButton";
import { IDeliveryManagement } from "../../types/deliveryManagement.type";

// Define the type for the props
interface AdminGearDeliveryTableProps {
  data: IDeliveryManagement[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewPaymentModal: (record: IDeliveryManagement) => void; // Function to handle viewing payment details
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const AdminGearDeliveryTable: React.FC<AdminGearDeliveryTableProps> = ({
  data,
  loading,
  setPage,
  showViewPaymentModal,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (_: unknown, record: any) => record?.clientId?.name || "N/A",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      render: (_: unknown, record: IDeliveryManagement) =>
        record?.gearMarketplaceId?.name || record?.serviceType || "N/A",
    },
    {
      title: "Seller Name",
      dataIndex: "sellerName",
      key: "sellerName",
      render: (_: unknown, record: IDeliveryManagement) =>
        record?.sellerId?.name || record?.serviceProviderId?.name || "N/A",
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
      render: (_: unknown, record: IDeliveryManagement) =>
        record?.sellerId?.profileId?.bankName ||
        record?.serviceProviderId?.profileId?.bankName ||
        "N/A",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      render: (_: unknown, record: IDeliveryManagement) =>
        record?.sellerId?.profileId?.accountNumber ||
        record?.serviceProviderId?.profileId?.accountNumber ||
        "N/A",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_: unknown, record: IDeliveryManagement) => {
        const gear = record?.gearMarketplaceId;
        if (gear) {
          const total =
            (gear.price || 0) +
            (gear.totalVatAmount || 0) +
            (gear.shippingCompany?.price || 0);
          return `${total}€`;
        }
        return `${record?.price || 0}€`;
      },
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (_: unknown, record: IDeliveryManagement) =>
        record?.deliveryDate
          ? new Date(record.deliveryDate).toLocaleDateString()
          : "N/A",
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      render: (_: unknown, record: IDeliveryManagement) => (
        <span
          className={`${record?.orderStatus === "delivered" ||
            record?.status === "delivered"
            ? "text-success"
            : "text-warning"
            } font-semibold`}
        >
          {record?.orderStatus || "N/A"}
        </span>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_: unknown, record: IDeliveryManagement) => (
        <span
          className={`${record?.paymentStatus === "pending" ? "text-error" : "text-success"
            } font-semibold`}
        >
          {record?.paymentStatus === "pending" ? "Unpaid" : "Paid"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IDeliveryManagement) => (
        <div>
          {record?.paymentStatus === "pending" ? (
            <Tooltip placement="right" title="Make Payment">
              <ReuseButton
                variant="secondary"
                className="!p-0 !bg-warning !border-none !text-primary-color cursor-pointer !w-full !text-sm"
                onClick={() => showViewPaymentModal(record)}
              >
                Make Payment
              </ReuseButton>
            </Tooltip>
          ) : (
            <ReuseButton
              variant="outline"
              className="!p-0  !border !border-success !text-success !cursor-default !w-full !text-sm"
            >
              Paid
            </ReuseButton>
          )}
        </div>
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

export default AdminGearDeliveryTable;
