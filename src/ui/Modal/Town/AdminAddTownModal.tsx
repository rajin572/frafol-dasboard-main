/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddTownMutation } from "../../../redux/features/town/townApi";
interface AdminAddTownModalProps {
    isAddModalVisible: boolean;
    handleCancel: () => void;
}

const AdminAddTownModal: React.FC<AdminAddTownModalProps> = ({
    isAddModalVisible,
    handleCancel,
}) => {
    const [form] = Form.useForm();

    const [addTown] = useAddTownMutation();

    const onSubmit = async (values: any) => {
        const data = {
            name: values?.name,
        };
        const res = await tryCatchWrapper(
            addTown,
            { body: data },
            "Adding Town..."
        );

        console.log(res);

        if (res?.statusCode === 201) {
            form.resetFields();
            handleCancel();
        }
    };
    return (
        <Modal
            open={isAddModalVisible}
            onCancel={handleCancel}
            footer={null}
            centered
            className="lg:!w-[500px]"
        >
            <div className="p-5 text-base-color">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
                    Create New Town
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
                        Add
                    </ReuseButton>
                </ReusableForm>
            </div>
        </Modal>
    );
};

export default AdminAddTownModal;
