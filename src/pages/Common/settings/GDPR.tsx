/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ReuseButton from "../../../ui/Button/ReuseButton";
import {
  useGetSettingQuery,
  useUpdateSettingMutation,
} from "../../../redux/features/setting/settingApi";
import { toast } from "sonner";
import Loading from "../../../ui/Loading";
import RichTextEditor from "../../../Components/Shared/RichTextEditor";

const GDPR = () => {
  const [addStaticContent] = useUpdateSettingMutation();
  const [content, setContent] = useState("");

  const { data, isFetching } = useGetSettingQuery("gdpr");

  useEffect(() => {
    if (data) {
      setContent(data?.data?.content);
    }
  }, [data]);

  const handleOnSave = async () => {
    const data = {
      key: "gdpr",
      content,
    };
    const toastId = toast.loading("Updating GDPR...");

    try {
      const res = await addStaticContent(data).unwrap();
      toast.success(res?.message, { id: toastId, duration: 2000 });
      setContent("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update Contact Us", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          GDPR
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className="w-[95%]">
          <RichTextEditor
            content={content}
            setContent={setContent}
            placeholder="Type something amazing..."
            minHeight="500px"
          />

          <ReuseButton variant="secondary" onClick={handleOnSave}>
            Save
          </ReuseButton>
        </div>
      </div>
    </div>
  );
};
export default GDPR;
