/* eslint-disable @typescript-eslint/no-explicit-any */
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import ReuseButton from "../../../ui/Button/ReuseButton";
import {
  useGetSettingQuery,
  useUpdateSettingMutation,
} from "../../../redux/features/setting/settingApi";
import { toast } from "sonner";
import Loading from "../../../ui/Loading";

const FrameworkAgreement = () => {
  const [addStaticContent] = useUpdateSettingMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { data, isFetching } = useGetSettingQuery("frameworkAgreement");

  useEffect(() => {
    if (data) {
      setContent(data?.data?.content);
    }
  }, [data]);

  const handleOnSave = async () => {
    const data = {
      key: "frameworkAgreement",
      content,
    };
    const toastId = toast.loading("Updating Framework Agreement...");

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
          Framework Agreement
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className="w-[95%]">
          <div className=" mb-10">
            <JoditEditor
              ref={editor}
              value={content}
              config={{ height: 500, theme: "light", readonly: false }}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <ReuseButton variant="secondary" onClick={handleOnSave}>
            Save
          </ReuseButton>
        </div>
      </div>
    </div>
  );
};
export default FrameworkAgreement;
