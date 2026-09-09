/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import { useEffect } from "react";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateTownMutation } from "../../../redux/features/town/townApi";
interface AdminEditTownModalProps {
    isEditModalVisible: boolean;
    handleCancel: () => void;
    currentRecord?: any; // Optional, if you want to pre-fill the form with existing data
}

const AdminEditTownModal: React.FC<AdminEditTownModalProps> = ({
    isEditModalVisible,
    handleCancel,
    currentRecord,
}) => {
    const [updateTown] = useUpdateTownMutation();
    const [form] = Form.useForm();

    useEffect(() => {
        if (currentRecord) {
            form.setFieldsValue({
                name: currentRecord.name,
            });
        }
    }, [currentRecord, form]);

    const onSubmit = async (values: any) => {
        const formData = new FormData();

        if (values?.image?.[0]?.originFileObj) {
            formData.append("image", values?.image?.[0]?.originFileObj);
        }

        const data = {
            name: values?.name,
        };

        formData.append("data", JSON.stringify(data));

        const res = await tryCatchWrapper(
            updateTown,
            { body: data, params: { id: currentRecord?._id } },
            "Updating Town..."
        );

        console.log(res);

        if (res?.statusCode === 200) {
            form.resetFields();
            handleCancel();
        }
    };
    return (
        <Modal
            open={isEditModalVisible}
            onCancel={handleCancel}
            footer={null}
            centered
            className="lg:!w-[500px]"
        >
            <div className="p-5 text-base-color">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
                    Update Town
                </h1>
                <ReusableForm form={form} handleFinish={onSubmit}>
                    <ReuseInput
                        name="name"
                        label="Town name"
                        placeholder="Enter Town name"
                        rules={[{ required: true, message: "Town name is required" }]}
                        labelClassName="!font-semibold"
                    />

                    <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
                        Update
                    </ReuseButton>
                </ReusableForm>
            </div>
        </Modal>
    );
};

export default AdminEditTownModal;
