import React from "react";
import { Modal, Table } from "antd";
import { useGetWorkshopParticipantsQuery } from "../../../redux/features/workshop/workshopApi";

interface IWorkshopParticipant {
    _id: string;
    orderId: string;
    clientId?: {
        _id: string;
        name: string;
        email: string;
        profileImage?: string;
    };
    streetAddress?: string;
    town?: string;
    country?: string;
    paymentStatus?: string;
}

interface ViewWorkshopParticipantsModalProps {
    isModalVisible: boolean;
    handleCancel: () => void;
    workshopId?: string;
    workshopTitle?: string;
}

const ViewWorkshopParticipantsModal: React.FC<ViewWorkshopParticipantsModalProps> = ({
    isModalVisible,
    handleCancel,
    workshopId,
    workshopTitle,
}) => {
    const { data, isFetching } = useGetWorkshopParticipantsQuery(
        workshopId as string,
        { skip: !isModalVisible || !workshopId }
    );

    const participants: IWorkshopParticipant[] = data?.data || [];

    const participantColumns = [
        {
            title: "Order ID",
            dataIndex: "orderId",
            key: "orderId",
        },
        {
            title: "Name",
            dataIndex: ["clientId", "name"],
            key: "name",
            render: (_: unknown, record: IWorkshopParticipant) =>
                record?.clientId?.name || "—",
        },
        {
            title: "Email",
            dataIndex: ["clientId", "email"],
            key: "email",
            render: (_: unknown, record: IWorkshopParticipant) =>
                record?.clientId?.email || "—",
        },
        {
            title: "Street Address",
            dataIndex: "streetAddress",
            key: "streetAddress",
            render: (_: unknown, record: IWorkshopParticipant) =>
                record?.streetAddress || "—",
        },
        {
            title: "Town",
            dataIndex: "town",
            key: "town",
            render: (_: unknown, record: IWorkshopParticipant) =>
                record?.town || "—",
        },
        {
            title: "Country",
            dataIndex: "country",
            key: "country",
            render: (_: unknown, record: IWorkshopParticipant) =>
                record?.country || "—",
        },
    ];

    return (
        <Modal
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            centered
            className={"lg:!w-[900px]"}
            title={
                <span className="text-base sm:text-lg font-bold">
                    Participants{workshopTitle ? ` — ${workshopTitle}` : ""}
                </span>
            }
        >
            <div className="mt-4">
                <Table
                    columns={participantColumns}
                    dataSource={participants}
                    loading={isFetching}
                    rowKey="_id"
                    pagination={false}
                    scroll={{ x: "max-content" }}
                    size="small"
                />
            </div>
        </Modal>
    );
};

export default ViewWorkshopParticipantsModal;
