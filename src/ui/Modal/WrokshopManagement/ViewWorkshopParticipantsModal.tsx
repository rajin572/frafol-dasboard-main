import React from "react";
import { Modal, Table } from "antd";
import { useGetWorkshopParticipantsQuery } from "../../../redux/features/workshop/workshopApi";
import { formatDateWithAtTime } from "../../../utils/dateFormet";
import { IWorkshop, IWorkshopParticipant } from "../../../types";
import InvoiceDownloadButtons from "../../Button/InvoiceDownloadButtons";
import {
    buildWorkshopInvoices,
    isWorkshopCompleted,
} from "../../../utils/invoice/workshopInvoices";
import { isOrderPaid } from "../../../utils/invoice/invoiceStatus";

interface ViewWorkshopParticipantsModalProps {
    isModalVisible: boolean;
    handleCancel: () => void;
    workshopId?: string;
    workshopTitle?: string;
    // The workshop these participants registered for (price, VAT, date and its instructor).
    workshop?: IWorkshop | null;
}

const ViewWorkshopParticipantsModal: React.FC<ViewWorkshopParticipantsModalProps> = ({
    isModalVisible,
    handleCancel,
    workshopId,
    workshopTitle,
    workshop,
}) => {
    const { data, isFetching } = useGetWorkshopParticipantsQuery(
        workshopId as string,
        { skip: !isModalVisible || !workshopId }
    );

    const participants: IWorkshopParticipant[] = data?.data || [];

    // The invoice builders read the workshop (price, VAT, date) from the participant and take
    // the instructor separately. The participants list does not necessarily populate them, so
    // fill both from the workshop this list belongs to.
    const toInvoiceSource = (participant: IWorkshopParticipant) => {
        const participantWorkshop =
            typeof participant.workshopId === "object" ? participant.workshopId : undefined;
        const participantInstructor =
            typeof participant.instructorId === "object" ? participant.instructorId : undefined;
        return {
            record: { ...participant, workshopId: { ...participantWorkshop, ...workshop } },
            instructor: { ...workshop?.authorId, ...participantInstructor },
        };
    };

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
        {
            title: "T&C Accepted",
            dataIndex: "termsAndConditionsAccepted",
            key: "termsAndConditionsAccepted",
            render: (_: unknown, record: IWorkshopParticipant) =>
                record?.termsAndConditionsAccepted ? `Yes (${formatDateWithAtTime(record?.createdAt)})` : "No",
        },
        {
            title: "Early Service Accepted",
            dataIndex: "earlyServiceCommencementAccepted",
            key: "earlyServiceCommencementAccepted",
            render: (_: unknown, record: IWorkshopParticipant) =>
                record?.earlyServiceCommencementAccepted ? `Yes (${formatDateWithAtTime(record?.createdAt)})` : "No",
        },
        {
            title: "Withdrawal Right Accepted",
            dataIndex: "withdrawalRightAcknowledgementAccepted",
            key: "withdrawalRightAcknowledgementAccepted",
            render: (_: unknown, record: IWorkshopParticipant) =>
                record?.withdrawalRightAcknowledgementAccepted ? `Yes (${formatDateWithAtTime(record?.createdAt)})` : "No",
        },
        {
            title: "Invoices",
            key: "invoices",
            render: (_: unknown, record: IWorkshopParticipant) => {
                const { record: invoiceRecord, instructor } = toInvoiceSource(record);
                return (
                    <div className="min-w-[440px]">
                        <InvoiceDownloadButtons
                            orderId={record.orderId}
                            getInvoices={() => buildWorkshopInvoices(invoiceRecord, instructor)}
                            showPayment={isOrderPaid(record.paymentStatus, record.paidAt)}
                            showFinal={isWorkshopCompleted(invoiceRecord)}
                            compact
                        />
                    </div>
                );
            },
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
