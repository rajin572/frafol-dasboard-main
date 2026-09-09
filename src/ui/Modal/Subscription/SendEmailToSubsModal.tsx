/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Input } from "antd";
import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ReusableForm from "../../Form/ReuseForm";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseSelect from "../../Form/ReuseSelect";
import { useSendEmailMutation } from "../../../redux/features/subscribe/subscribeApi";
import ReuseInput from "../../Form/ReuseInput";

interface SendEmailToSubsModalProps {
    isAddModalVisible: boolean;
    handleCancel: () => void;
    currentRecord: any;
}

const SendEmailToSubsModal: React.FC<SendEmailToSubsModalProps> = ({
    isAddModalVisible,
    handleCancel,
    currentRecord,
}) => {
    const [form] = Form.useForm();
    const [sendEmail] = useSendEmailMutation();
    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

    const handleSelectChange = (value: string[]) => {
        // If ALL selected → keep only ALL
        if (value.includes("all")) {
            setSelectedEmails(["all"]);
            form.setFieldsValue({ emails: ["all"] });
            return;
        }

        // Otherwise normal selection
        setSelectedEmails(value);
    };


    const onSubmit = async (values: any) => {
        const data = {
            emails: selectedEmails.includes("all")
                ? currentRecord?.map((data: any) => data.email)
                : selectedEmails,
            additionalEmails: values?.additionalEmails || [],
        };

        const res = await tryCatchWrapper(
            sendEmail,
            {
                body: {
                    subject: values?.subject,
                    message: values?.message,
                    emails: [...data.emails, ...data.additionalEmails],
                }
            },
            "Sending Emails..."
        );

        console.log(res);

        if (res?.statusCode === 200) {
            form.resetFields();
            setSelectedEmails([]);
            handleCancel();
        }
    };

    // Create options with "All" option at the top
    const emailOptions = [
        {
            value: "all",
            label: "All Subscribers",
            disabled: selectedEmails.length > 0 && !selectedEmails.includes("all"),
        },
        ...(currentRecord?.map((data: any) => ({
            value: data.email,
            label: data.email,
            disabled: selectedEmails.includes("all"), // disable when ALL selected
        })) || [])
    ];


    return (
        <Modal
            open={isAddModalVisible}
            onCancel={() => {
                handleCancel();
                form.resetFields();
            }}
            footer={null}
            centered
            className="lg:!w-[900px]"
        >
            <div className="p-5 text-base-color">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
                    Send Email to Subscribers
                </h1>
                <ReusableForm form={form} handleFinish={onSubmit}>
                    <ReuseInput
                        name="subject"
                        label="Subject"
                        labelClassName="!text-secondary-color !font-semibold"
                        placeholder="Write your subject"
                        rules={[{ required: true, message: "Please enter subject" }]}
                    />
                    <ReuseInput
                        inputType="textarea"
                        rows={6}
                        name="message"
                        label="Message"
                        labelClassName="!text-secondary-color !font-semibold"
                        placeholder="Write your message"
                        rules={[{ required: true, message: "Please enter message" }]}
                    />
                    <ReuseSelect
                        mode="multiple"
                        name="emails"
                        label="Select Subscribers"
                        placeholder="Select Subscribers"
                        labelClassName="!text-secondary-color !font-semibold"
                        rules={[{ required: true, message: "Please select your subscribers" }]}
                        options={emailOptions}
                        onChange={handleSelectChange}
                        value={selectedEmails}
                    />


                    {/* Dynamic Email Input Fields */}
                    <div className="mt-4">
                        <label className="text-secondary-color font-semibold block mb-2">
                            Add Additional Emails
                        </label>
                        <Form.List name="additionalEmails">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div
                                            key={key}
                                            className="flex items-center gap-2 mb-2 !w-full"
                                        >
                                            <Form.Item
                                                {...restField}
                                                name={name}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter email",
                                                    },
                                                    {
                                                        type: "email",
                                                        message: "Please enter a valid email",
                                                    },
                                                ]}
                                                className="mb-0 !w-full"
                                            >
                                                <Input
                                                    placeholder="Enter email address"
                                                    className="!py-1.5 !px-3 !text-base !bg-[#EFEFEF] border !border-[#EFEFEF] outline-none !ring-0 !text-base-color rounded-lg !w-full"
                                                />
                                            </Form.Item>
                                            <MinusCircleOutlined
                                                className="text-red-500! text-lg cursor-pointer hover:text-red-700! -mt-5"
                                                onClick={() => remove(name)}
                                            />
                                        </div>
                                    ))}
                                    <Form.Item>
                                        <ReuseButton
                                            onClick={() => add()}
                                            icon={<PlusOutlined />}
                                            className="!w-full"
                                        >
                                            Add More Email
                                        </ReuseButton>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </div>

                    <ReuseButton htmlType="submit" variant="secondary" className="mt-4 !w-full">
                        Send Email
                    </ReuseButton>
                </ReusableForm>
            </div>
        </Modal>
    );
};

export default SendEmailToSubsModal;