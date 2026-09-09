import React from "react";
import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { IInteractionCommunity } from "../../types";
import { formatDateTime } from "../../utils/dateFormet";
import { GoEye } from "react-icons/go";

// Define the type for the props
interface InteractionCommunityForumTableProps {
  data: IInteractionCommunity[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IInteractionCommunity) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const stripHtmlTags = (html: string): string => {
  if (!html) return '';

  try {
    // Remove style tags and their content
    let text = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

    // Remove script tags and their content
    text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

    // Remove all HTML tags
    text = text.replace(/<[^>]+>/g, '');

    // Decode HTML entities
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    text = textarea.value;

    // Remove extra whitespace and newlines
    text = text.replace(/\s+/g, ' ').trim();

    return text;
  } catch (error) {
    console.error('Error stripping HTML:', error);
    return '';
  }
};

const InteractionCommunityForumTable: React.FC<
  InteractionCommunityForumTableProps
> = ({ data, loading, showViewModal, setPage, page = 1, total = 0, limit }) => {
  const columns = [
    {
      title: "UID",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "authorId", // Change from "userId" to "authorId"
      key: "authorId",
      render: (_: unknown, record: IInteractionCommunity) =>
        `${record?.authorId.name}`, // Render author name
    },
    {
      title: "Role",
      dataIndex: "authorId", // Change from "userId" to "authorId"
      key: "role",
      render: (_: unknown, record: IInteractionCommunity) =>
        record?.authorId.role || "N/A", // Render role from authorId
    },
    {
      title: "Title",
      dataIndex: "title", // Render the title from the record
      key: "title",
      render: (title: string) => <p>{title}</p>,
    },
    {
      title: "Content",
      dataIndex: "text",
      key: "text",
      width: 300,
      render: (text: string) => {
        // Strip HTML tags and get plain text
        const plainText = stripHtmlTags(text);

        // If still empty after stripping, return N/A
        if (!plainText || plainText.trim() === '') {
          return "N/A";
        }

        return (
          <div className="line-clamp-2">
            {plainText}
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt", // Render the date createdAt from the record
      key: "createdAt",
      render: (createdAt: string) => formatDateTime(createdAt), // Use the formatDateTime function for formatting
    },
    {
      title: "Status",
      dataIndex: "approvalStatus", // Use approvalStatus from the record
      key: "approvalStatus",
      render: (approvalStatus: string) => (
        <span
          className={
            approvalStatus === "approved"
              ? "text-green-500"
              : approvalStatus === "rejected"
                ? "text-red-500"
                : "text-yellow-500"
          }
        >
          {approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)}
        </span>
      ), // Show the status with color coding for approved, pending, and rejected
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IInteractionCommunity) => (
        <Space size="middle">
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          {/* Approve Details Tooltip */}
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

export default InteractionCommunityForumTable;
