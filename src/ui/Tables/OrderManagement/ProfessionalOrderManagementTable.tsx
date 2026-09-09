/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import ReuseTable from "../../../utils/ReuseTable";
import { MdOutlineCancel } from "react-icons/md";
import { IEventOrder } from "../../../types";
import { budgetLabels, eventOrderStatus } from "../../../utils/budgetLabels";
import { formatDate } from "../../../utils/dateFormet";
import { IoMdEye } from "react-icons/io";

// Define the type for the props
interface ProfessionalOrderManagementTableProps {
  data: IEventOrder[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IEventOrder) => void;
  showCancleModal: (record: IEventOrder) => void; // Function to handle viewing payment details
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const ProfessionalOrderManagementTable: React.FC<
  ProfessionalOrderManagementTableProps
> = ({
  data,
  loading,
  setPage,
  showViewModal,
  showCancleModal,
  page,
  total,
  limit,
}) => {
    const checkExtension = (extensionReq: any) => {
      const extensionLength = extensionReq?.length;

      const lastExtension = extensionReq[extensionLength - 1];

      return lastExtension;
    };
    const columns = [
      {
        title: "Order ID",
        dataIndex: "orderId",
        key: "orderId",
        fixed: "left",
      },
      {
        title: "Client Name",
        dataIndex: "userId",
        key: "userId",
        render: (_: unknown, record: IEventOrder) =>
          record?.companyName || record?.name || record?.userId?.name,
        fixed: "left",
      },
      {
        title: "Photographer/Videographer",
        dataIndex: ["serviceProviderId", "name"],
        key: "serviceProviderId",
      },
      {
        title: "Order Type",
        dataIndex: "orderType",
        key: "orderType",
      },
      {
        title: "Event Name",
        dataIndex: ["packageId", "title"],
        key: "packageId",
        render: (_: unknown, record: IEventOrder) => (
          <div>
            {record?.orderType === "custom" ? (
              <p className="capitalize">{record?.title}</p>
            ) : (
              <p className="capitalize">{record?.packageId?.title}</p>
            )}
          </div>
        ),
      },
      {
        title: "Amount",

        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (text: string, record: IEventOrder) => (
          <div>
            {text ? (
              <p className="capitalize">{text}€</p>
            ) : (
              <p className="capitalize">
                {budgetLabels[record?.budget_range as string] ||
                  record?.budget_range}
              </p>
            )}
          </div>
        ),
      },
      {
        title: " Order Date",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text: string) => formatDate(text),
      },
      {
        title: " Event Date",
        dataIndex: "date",
        key: "date",
        render: (text: string) => formatDate(text),
      },
      {
        title: " Delivery Date",
        dataIndex: "deliveryDate",
        key: "deliveryDate",
        render: (text: string) => formatDate(text),
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
        width: 300,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_: string, record: IEventOrder) => (
          <span className=" font-semibold capitalize">
            {eventOrderStatus[record?.status as string] || record?.status}
          </span>
        ),
      },

      {
        title: "Delivery Status",
        dataIndex: "status",
        key: "status",
        render: (_: unknown, record: IEventOrder) => (
          <span className="font-semibold capitalize">
            {record?.extensionRequests?.length < 1
              ? "Request Not Sent"
              : checkExtension(record?.extensionRequests)?.status === "pending"
                ? "Request On Pending"
                : checkExtension(record?.extensionRequests)?.status === "accepted"
                  ? " Request Approved"
                  : " Request Decline"}
          </span>
        ),
      },

      {
        title: "Action",
        key: "action",
        render: (_: unknown, record: IEventOrder) => (
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              <button
                className="!p-0 !bg-transparent !border-none cursor-pointer"
                onClick={() => showViewModal(record)}
              >
                <IoMdEye style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
            {record?.status !== "cancelled" && record?.status !== "delivered" && (
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

export default ProfessionalOrderManagementTable;
