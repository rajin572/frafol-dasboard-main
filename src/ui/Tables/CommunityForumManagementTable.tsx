import React from "react";
import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { formatDateTime } from "../../utils/dateFormet";
import { GoEye } from "react-icons/go";
import { ICommunityPost } from "../../types";
import { MdDelete } from "react-icons/md";

// Define the type for the props
interface CommunityForumManagementTableProps {
    data: ICommunityPost[]; // Replace `unknown` with the actual type of your data array
    loading: boolean;
    showViewModal: (record: ICommunityPost) => void; // Function to handle viewing a user
    showDeleteModal: (record: ICommunityPost) => void;
    setPage?: (page: number) => void; // Function to handle pagination
    page: number;
    total: number;
    limit: number;
}

const CommunityForumManagementTable: React.FC<
    CommunityForumManagementTableProps
> = ({ data, loading, showViewModal, showDeleteModal, setPage, page = 1, total = 0, limit }) => {
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
            render: (_: unknown, record: ICommunityPost) =>
                `${record?.authorId.name}`, // Render author name
        },
        {
            title: "Role",
            dataIndex: "authorId", // Change from "userId" to "authorId"
            key: "role",
            render: (_: unknown, record: ICommunityPost) =>
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
            dataIndex: "text", // Render content or feedback from the record
            key: "text",
            render: (text: string) => (
                <p className="line-clamp-2" dangerouslySetInnerHTML={{
                    __html: text as string,
                }}></p>
            ), // Truncate if the content is too long
            width: "400px",
        },
        {
            title: "Likes",
            dataIndex: "totalLikes", // Render the date totalLikes from the record
            key: "totalLikes",
        },
        {
            title: "Viewers",
            dataIndex: "totalViewers", // Render the date totalViewers from the record
            key: "totalViewers",
        },
        {
            title: "Comments",
            dataIndex: "totalComments", // Render the date totalComments from the record
            key: "totalComments",
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
            render: (_: unknown, record: ICommunityPost) => (
                <Space size="middle">
                    <Tooltip placement="right" title="View Details">
                        <button
                            className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                            onClick={() => showViewModal(record)}
                        >
                            <GoEye style={{ fontSize: "24px" }} />
                        </button>
                    </Tooltip>
                    <Tooltip placement="right" title="Delete">
                        <button
                            className="!p-0 !bg-transparent !border-none !text-error cursor-pointer"
                            onClick={() => showDeleteModal(record)}
                        >
                            <MdDelete style={{ fontSize: "24px" }} />
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

export default CommunityForumManagementTable;
