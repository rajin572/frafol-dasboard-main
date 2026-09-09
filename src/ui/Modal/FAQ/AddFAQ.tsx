import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Collapse, ConfigProvider, Form, Modal } from "antd";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
const { Panel } = Collapse;

interface Faq {
  question: string;
  answer: string;
}

interface AddFAQProps {
  isFaqModalOpen: boolean;
  setIsFaqModalOpen: (open: boolean) => void;
}

const AddFAQ: React.FC<AddFAQProps> = ({
  isFaqModalOpen,
  setIsFaqModalOpen,
}) => {
  const [faqList, setFaqList] = useState<Faq[]>([{ question: "", answer: "" }]);
  const [activeKey, setActiveKey] = useState<string[]>(["0"]);
  const [form] = Form.useForm();

  const handleAddQus = () => {
    form
      .validateFields()
      .then(() => {
        const newFaqList = [...faqList, { question: "", answer: "" }];
        setFaqList(newFaqList);
        setActiveKey([newFaqList.length - 1].map(String)); // Ensure the key is string
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleRemoveQus = (index: number) => {
    if (faqList.length > 1) {
      const newFaqList = faqList.filter((_, i) => i !== index);
      setFaqList(newFaqList);
      setActiveKey([Math.max(0, index - 1)].map(String));
      const fields = form.getFieldsValue();
      const newFields = { ...fields };
      delete newFields.faqs?.[index];
      form.setFieldsValue(newFields);
    }
  };

  const handleOnSave = async (values: unknown) => {
    console.log(values);
    // const toastId = toast.loading("Adding FAQ...");
    // try {
    //   const res = await createFaq(values);
    //   if (res?.data?.success) {
    //     toast.success("FAQ added successfully", {
    //       id: toastId,
    //       duration: 2000,
    //     });
    //     form.resetFields();
    //     setIsFaqModalOpen(false);
    //   }
    // } catch (error) {
    //   toast.error("Failed to add FAQ", { id: toastId, duration: 2000 });
    // }
  };

  return (
    <Modal
      open={isFaqModalOpen}
      onCancel={() => setIsFaqModalOpen(false)}
      footer={null}
      width={800}
    >
      <div className="p-2 rounded flex flex-col gap-5 w-full">
        <div>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold py-4 text-base-color">
            Add FAQ
          </h1>
        </div>
        {/* Q/A Portions */}
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                colorTextHeading: "#222222",
                colorBorder: "#222222",
                colorText: "#222222",
                borderRadiusLG: 0,
                headerPadding: "12px 20px",
                contentBg: "rgb(255,255,255)",
                headerBg: "rgb(255,255,255)",
              },
            },
          }}
        >
          <Form form={form} onFinish={handleOnSave}>
            <Collapse
              accordion
              activeKey={activeKey}
              onChange={setActiveKey}
              className="bg-primary-color"
            >
              {faqList.map((faq, index) => (
                <Panel
                  header={`Question ${index + 1}`}
                  key={index.toString()}
                  className="!text-base-color bg-primary-color flex flex-col gap-1"
                  extra={
                    faqList.length > 1 && (
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveQus(index)}
                      >
                        <MdDelete className="size-5" />
                      </button>
                    )
                  }
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <p className="text-base-color text-xl font-medium">{`Question`}</p>
                      <Form.Item
                        name={["faqs", index, "question"]}
                        initialValue={faq.question}
                        rules={[
                          {
                            required: true,
                            message: "Please input the question!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Type your question"
                          className="h-10 !bg-transparent border !border-base-color !text-base-color placeholder:text-gray-600"
                        />
                      </Form.Item>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-base-color text-xl font-medium">
                        Answer
                      </p>
                      <Form.Item
                        name={["faqs", index, "answer"]}
                        initialValue={faq.answer}
                        rules={[
                          {
                            required: true,
                            message: "Please input the answer!",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={4}
                          placeholder="Type your answer"
                          className="h-10 !bg-transparent border !border-base-color !text-base-color placeholder:text-gray-600"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Panel>
              ))}
            </Collapse>
            <div>
              <Button
                block
                onClick={handleAddQus}
                style={{
                  padding: "1px",
                  fontSize: "24px",
                  fontWeight: "500",
                  color: "#222222",
                  background: "transparent",
                  height: "40px",
                  border: "1px solid #222222",
                }}
                className="!mt-5"
              >
                <PlusOutlined />
                Add More Questions
              </Button>
              <Button
                block
                htmlType="submit"
                style={{
                  padding: "1px",
                  fontSize: "24px",
                  fontWeight: "500",
                  height: "40px",
                  border: "none",
                }}
                className="!mt-10 !bg-secondary-color !border-none text-xl !text-primary-color"
              >
                Save
              </Button>
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </Modal>
  );
};

export default AddFAQ;
