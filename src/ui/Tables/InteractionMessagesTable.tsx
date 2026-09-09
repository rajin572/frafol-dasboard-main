import React from "react";
import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { IInteractionMessage } from "../../types";
import { formatDateTime } from "../../utils/dateFormet";
import ReuseButton from "../Button/ReuseButton";

// Define the type for the props
interface InteractionMessagesTableProps {
  data: IInteractionMessage[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showApproveModal: (record: IInteractionMessage) => void; // Function to handle Approveing a user
  showDeclineModal: (record: IInteractionMessage) => void; // Function to handle Approveing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const InteractionMessagesTable: React.FC<InteractionMessagesTableProps> = ({
  data,
  loading,
  showApproveModal,
  showDeclineModal,
  setPage,
  page = 1,
  total = 0,
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
    {
      title: "UID",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Client Name",
      dataIndex: "chat",
      key: "clientName",
      render: (_: unknown, record: IInteractionMessage) => {
        const client = record.chat.users.find(
          (user) => user.role === "both" // assuming 'both' means client
        );
        return `${client?.name || ""} ${client?.sureName || ""}`;
      },
    },
    {
      title: "Photographer/Videographer",
      dataIndex: "chat",
      key: "photographer",
      render: (_: unknown, record: IInteractionMessage) => {
        const photographer = record.chat.users.find(
          (user) => user.role === "admin" // adjust if photographers have a different role
        );
        return `${photographer?.name || ""} ${photographer?.sureName || ""}`;
      },
    },
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
      render: (sender: IInteractionMessage["sender"]) =>
        `${sender?.name || ""} ${sender?.sureName || ""}`,
    },
    {
      title: "Message Preview",
      dataIndex: "text",
      key: "messagePreview",
      render: (text: string) => (
        <p>{text.length > 50 ? `${text.substring(0, 50)}...` : text}</p>
      ),
    },
    {
      title: "Date Sent",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => formatDateTime(createdAt),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IInteractionMessage) => (
        <Space size="middle">
          {/* Approve Details Tooltip */}
          <Tooltip placement="right" title="Approve">
            <ReuseButton
              variant="secondary"
              className="!bg-success !border-success"
              onClick={() => showApproveModal(record)}
            >
              Approve
            </ReuseButton>
          </Tooltip>
          <Tooltip placement="right" title="Decline">
            <ReuseButton
              variant="secondary"
              className="bg-error border-error"
              onClick={() => showDeclineModal(record)}
            >
              Decline
            </ReuseButton>
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

export default InteractionMessagesTable;
