import { FiBell } from "react-icons/fi";
import { MdArrowBackIos } from "react-icons/md";
import { useGetAllNotificationsQuery } from "../../redux/features/overview/overviewApi";
import { INotification } from "../../types";
import { formatDateTime } from "../../utils/dateFormet";
import { Pagination } from "antd";
import { useState } from "react";
import { FadeLoader } from "react-spinners";

const Notifications = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: notification, isFetching: notificationFetching } =
    useGetAllNotificationsQuery(
      {
        page,
        limit,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const notificationData: INotification[] = notification?.data?.notifications || [];
  const totalNotifications: number = notification?.data?.meta?.total || 0;

  return (
    <div
      className=" bg-slate-50  rounded-xl min-h-[88vh] pb-10"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center bg-secondary-color gap-1 py-3 px-5 mb-3 rounded-tl-xl rounded-tr-xl">
        <MdArrowBackIos
          className="text-xl sm:text-2xl lg:text-3xl text-primary-color cursor-pointer"
          onClick={() => window.history.back()}
        />

        <h1 className="text-3xl font-bold text-primary-color">Notification</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8 space-y-2 mb-10 min-h-[78vh]">
        {notificationFetching ? (
          <div className=" isolate aspect-video h-[78vh] bg-primary-color/40 backdrop-blur w-full flex justify-center items-center">
            <FadeLoader
              color="#ad2b08"
            />
          </div>
        ) : (
          notificationData?.map((notification: INotification) => (
            <div
              key={notification?._id}
              className="flex items-center space-x-3 p-2 border-b border-gray-300 last:border-none"
            >
              {/* Icon */}
              <div className="bg-[#b8c1c3] p-2 rounded-full">
                <FiBell className="text-secondary-color w-6 h-6" />
              </div>

              {/* Notification text */}
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-700">
                  {notification?.message?.text}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDateTime(notification?.createdAt)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination
        current={page}
        onChange={(page) => setPage(page)}
        pageSize={limit}
        total={totalNotifications}
        showSizeChanger={false}
      />
    </div>
  );
};
export default Notifications;
