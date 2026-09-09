/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";

// Define the type for the props
interface AdminTownTableProps {
    data: any[]; // Replace `unknown` with the actual type of your data array
    loading: boolean;
    showEditModal: (record: any) => void; // Function to handle viewing a user
    showDeleteModal: (record: any) => void; // Function to handle viewing a user
    setPage?: (page: number) => void; // Function to handle pagination
    page: number;
    total: number;
    limit: number;
}

const AdminTownTable: React.FC<AdminTownTableProps> = ({
    data,
    loading,
    showEditModal,
    showDeleteModal,
    setPage,
    page,
    total,
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
            title: "Town Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Action",
            key: "action",
            render: (_: unknown, record: any) => (
                <Space size="middle">
                    {/* View Details Tooltip */}
                    <Tooltip placement="right" title="Edit">
                        <button
                            className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                            onClick={() => showEditModal(record)}
                        >
                            <MdEdit style={{ fontSize: "24px" }} />
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

export default AdminTownTable;
