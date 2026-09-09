/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Form, Input, Tooltip, Upload } from "antd";
import { BsImage } from "react-icons/bs";
import { FaFileAlt, FaTelegramPlane, FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import { selectSelectedChatUser } from "../../redux/features/conversation/conversationSlice";
import { useAppSelector } from "../../redux/hooks";
import { getBaseUrl, getImageUrl } from "../../helpers/config/envConfig";
import SpinLoader from "../../ui/SpinLoader";
import { AllImages } from "../../../public/images/AllImages";
import Cookies from "js-cookie";

const ConversationSendMessage = ({ socket }: any) => {
  const token = Cookies.get("frafoldashboard_accessToken");
  const selectedConversation = useAppSelector(selectSelectedChatUser);
  const serverUrl = getBaseUrl();
  const imageUrl = getImageUrl();
  const [form] = Form.useForm();
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); // Use an array for uploaded image URLs

  // Reset on new conversation
  useEffect(() => {
    setUploadedImages([]);
    form.setFieldValue("message", "");
  }, [selectedConversation?.chat?._id, form]);

  // Handle image selection
  const handleImageChange = ({ fileList: newFileList }: any) => {
    const latestFile = newFileList?.[0];
    if (latestFile) uploadImage(latestFile);
  };

  const uploadImage = async (file: any) => {
    setIsUploadLoading(true);
    const formData = new FormData();
    formData.append("images", file.originFileObj);

    try {
      const response = await axios.post(
        `${serverUrl}/message/file-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      console.log(response);

      if (response?.data?.data?.length > 0) {
        setUploadedImages((prev) => [...prev, response?.data?.data[0]]);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast.error("Failed to upload image");
    }
    setIsUploadLoading(false);
  };

  console.log(uploadedImages);

  const handleDeleteImage = (imageUrl: string) => {
    // Remove the image from the uploaded images list
    setUploadedImages((prev) => prev.filter((url) => url !== imageUrl));
    setIsUploadLoading(false);
  };

  const handleMessageSend = async (values: any) => {
    const data: any = {
      chatId: selectedConversation?.chat?._id,
      ...(values?.message?.length > 0 ? { text: values?.message } : {}),
      ...(uploadedImages.length > 0 ? { images: uploadedImages } : {}),
    };

    console.log(data);

    try {
      socket?.emit("send-message", data, (res: any) => {
        console.log(res);
        if (res?.success) {
          setUploadedImages([]); // Clear uploaded images after sending
          form.resetFields();
          setTextValue(null);
        }
      });
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Failed to send message",
        { duration: 2000 }
      );
    }
  };
  return (
    <div>
      <div className="w-full">
        {/* Show uploaded images instead of file list */}
        {uploadedImages.length > 0 && (
          <div className="absolute bottom-16 left-4 flex items-center gap-2 shadow">
            {uploadedImages.map((fileUrl, index) => {
              // Function to check if the file is an image based on its URL
              const isImage = /\.(jpg|jpeg|png|gif|svg)$/i.test(fileUrl);
              const fileName = fileUrl?.split("/").pop() || "file";

              return (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white border border-gray-300 rounded relative"
                >
                  {isImage ? (
                    // Render image thumbnail if it's an image
                    <img
                      src={
                        imageUrl + fileUrl
                          ? imageUrl + fileUrl
                          : AllImages?.cover
                      }
                      alt={fileName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    // Render icon and text for non-image files (e.g., PDF, ZIP)
                    <Tooltip title={fileName}>
                      <div className="w-16 h-16 flex flex-col gap-1 justify-center items-center bg-white rounded">
                        <FaFileAlt className="text-xl text-red-600" />
                        <span className="text-xs text-gray-600 truncate">
                          {fileName?.slice(0, 5) + "..."}
                        </span>
                      </div>
                    </Tooltip>
                  )}

                  <div className="bg-white p-1 rounded-full absolute top-0 right-0.5">
                    <FaTimes
                      className="cursor-pointer text-red-600"
                      style={{ fontSize: "12px" }}
                      onClick={() => handleDeleteImage(fileUrl)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Form form={form} onFinish={handleMessageSend}>
          <div className="!bg-white absolute -bottom-0 flex items-center gap-2 w-full p-1">
            <div className="flex-1 min-w-0 rounded-full bg-white border border-secondary-color px-4 py-2 flex items-center gap-3">
              <Form.Item className="flex-1 min-w-0 !p-0 !m-0" name="message">
                <Input
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder="Send your message..."
                  className="!border-none !ring-0 !outline-none !bg-transparent text-black"
                />
              </Form.Item>

              <Form.Item className="!p-0 !m-0 shrink-0" name="image">
                <Upload
                  fileList={[]}
                  onChange={handleImageChange}
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  maxCount={5} // Allow multiple files
                  accept=".jpg,.jpeg,.png,.gif,.zip,.pdf,.svg,.mp4,.mov,.avi,.mkv" // Accept specific file types
                  beforeUpload={(file) => {
                    const validTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/gif",
                      "application/zip",
                      "application/pdf",
                      "image/svg+xml",
                      "video/mp4",
                      "video/quicktime", // for .mov
                      "video/x-msvideo", // for .avi
                      "video/x-matroska", // for .mkv
                    ];

                    // Check if the file is of a valid type
                    if (!validTypes.includes(file.type)) {
                      toast.error(
                        "Invalid file type. Please upload a valid file."
                      );
                      return Upload.LIST_IGNORE; // Ignore invalid file type
                    }

                    // If file type is valid, allow the upload
                    return true;
                  }}
                  showUploadList={false}
                >
                  <BsImage className="cursor-pointer text-xl text-secondary-color mt-1" />
                </Upload>
              </Form.Item>
            </div>

            {isUploadLoading ? (
              <div className="shrink-0">
                <SpinLoader />
              </div>
            ) : (
              <button
                disabled={!textValue?.length && uploadedImages.length === 0}
                className="shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                type="submit"
              >
                <FaTelegramPlane className="text-[#F9DD40] bg-secondary-color rounded-full p-2 text-4xl" />
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConversationSendMessage;
