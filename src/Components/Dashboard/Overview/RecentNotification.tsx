/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoBellFill } from "react-icons/go";
import { formatDateTime } from "../../../utils/dateFormet";

interface NotificationItem {
  _id: string;
  message: {
    fullName?: string;
    text: string;
    image?: string;
    photos?: string[];
  };
  receiverId?: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  type?: string;
  isRead?: boolean;
  createdAt: string | Date;
}

const RecentNotification = ({
  notifications = [],
}: {
  notifications?: NotificationItem[];
}) => {
  // ✅ fallback data (optional)
  const fallbackData: NotificationItem[] = [];

  const dataToRender = notifications?.length > 0 ? notifications : fallbackData;

  return (
    <div
      className="w-full max-h-[300px] xl:max-h-[600px] overflow-y-auto rounded-xl relative border border-[#E1E1E1]"
      style={{ boxShadow: "0px 0px 5px 1px #0000000D" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center sticky top-0 px-5 pt-5 bg-white z-10">
        <h1 className="text-xl font-semibold">Recent Activity</h1>
      </div>

      {/* Notification List */}
      <div className="flex flex-col gap-5 p-5 bg-primary-color">
        {dataToRender?.map((activity: any) => (
          <div key={activity?._id} className="flex items-center gap-2">
            {/* Bell Icon */}
            <div
              className={`p-1 rounded-full w-fit ${
                activity?.isRead ? "bg-gray-400" : "bg-secondary-color"
              }`}
            >
              <GoBellFill className="text-lg cursor-pointer text-primary-color" />
            </div>

            {/* Text Info */}
            <div>
              <p className="text-[#242424] text-base font-medium">
                {activity?.message?.text}
              </p>

              {activity?.message?.fullName && (
                <p className="text-sm text-[#555] mt-0.5">
                  — {activity.message.fullName}
                </p>
              )}

              <p className="text-sm text-[#8A8D8E] mt-1">
                {formatDateTime(activity.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNotification;
