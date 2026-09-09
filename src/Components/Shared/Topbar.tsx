/* eslint-disable @typescript-eslint/no-explicit-any */

import { BarsOutlined, BellFilled } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { getImageUrl } from "../../helpers/config/envConfig";
import useUserData from "../../hooks/useUserData";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import SpinLoader from "../../ui/SpinLoader";
import { useGetAllNotificationsQuery } from "../../redux/features/overview/overviewApi";
import { INotification } from "../../types";
import { formatDateTime } from "../../utils/dateFormet";
import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/socket-context";
import { toast } from "sonner";

const Topbar = ({ collapsed, setCollapsed }: any) => {
  const serverUrl = getImageUrl();
  const [notificationCount, setNotificationCount] = useState(0);
  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);
  const socket = useSocket()?.socket;

  const user = useUserData();
  const { data, isFetching } = useGetProfileQuery({});

  const profileData = data?.data;

  const profileImage = profileData?.profileImage;

  // const { data: notification, isFetching: notificationFetching } =
  //   useGetNotificationQuery(
  //     {
  //       page: 1,
  //       limit: 5,
  //     },
  //     {
  //       skip: !open,
  //       refetchOnMountOrArgChange: open,
  //     }
  //   );
  // const notificationData = notification?.data?.notifications;

  const { data: notification, isFetching: notificationFetching } =
    useGetAllNotificationsQuery(
      {
        page: 1,
        limit: 6,
      }
    );

  const notificationData: INotification[] = notification?.data?.notifications;

  useEffect(() => {
    setAllNotifications(notificationData);
  }, [notificationData]);

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {notificationFetching ? (
        <div className="flex justify-center items-center w-80">
          <SpinLoader />
        </div>
      ) : (
        // Ensure allNotifications is an array before iterating
        Array.isArray(allNotifications) && allNotifications.length > 0 ? (
          [...allNotifications] // Create a shallow copy
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort
            .slice(0, 6) // Slice the top 6 notifications
            .map((notification) => (
              <div className="test-start" key={notification?._id}>
                <div className="flex gap-2">
                  <BellFilled className="!text-secondary-color " />
                  <div className="flex flex-col items-start">
                    <p>{notification?.message?.text}</p>
                    <p className="text-gray-400">
                      {formatDateTime(notification?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div>No notifications available</div> // Fallback message if no notifications are present
        )
      )}
      <Link
        to={`/${user?.role}/notifications`}
        className="w-2/3 mx-auto bg-[#022940] !text-secondary-color rounded !font-semibold !text-base py-1"
      >
        See More
      </Link>
    </div>
  );





  const handleNotification = useCallback((notification: any) => {


    if (!notification?.message?.text) {
      setNotificationCount(notification?.unreadCount);
    } else {
      const newNotification: INotification = {
        _id: Math.random().toString(36).substring(2, 9),
        userId: Math.random().toString(36).substring(2, 9),
        receiverId: Math.random().toString(36).substring(2, 9),
        message: notification?.message,
        type: "",
        isRead: false,
        createdAt: notification?.timestamp,
        updatedAt: notification?.timestamp,
        __v: 0,
      }
      setAllNotifications((prev) => [...prev, newNotification]);
      setNotificationCount((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.on(`notification`, handleNotification);

    return () => {
      socket.off(`notification`, handleNotification);
    };
  }, [socket, handleNotification]);

  const handleResetNotification = async () => {
    if (notificationCount > 0) {
      try {
        socket?.emit("readNotification");
      } catch (error: any) {
        toast.error(
          error?.data?.message || error?.message || "Something went wrong!",
          { duration: 2000 }
        );
      }
    }
  };
  return (
    <div className=" mx-auto flex justify-between gap-0 items-center mt-2">
      <div className="flex items-center gap-2 text-primary-color ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl !text-base-color"
        />
      </div>
      <div className="flex items-center justify-center  gap-5">
        <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          placement="bottomRight"
          onOpenChange={() => {
            handleResetNotification();
          }}
          className="cursor-pointer"
        >
          <div className="relative">
            <BellFilled
              shape="circle"
              className=" text-xl rounded-full h-6 font-bold !text-secondary-color "
            />
            <div className="absolute top-2.5 -right-1.5 bg-third-color text-secondary-color rounded-full w-4 h-4 text-xs font-semibold flex justify-center items-center">{notificationCount}</div>
          </div>

        </Dropdown>
        {isFetching ? (
          <div className="px-10 py-4">
            <SpinLoader />
          </div>
        ) : (
          <Link to="profile">
            <div className="flex items-center justify-center gap-0 bg-white text-base-color rounded-lg  px-2 py-1  border border-secondary-color ">
              <img
                src={
                  profileImage ? serverUrl + profileImage : AllImages.profile
                }
                alt="profile_pic"
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col justify-center">
                <p className="text-base-color font-semibold text-sm">
                  {profileData?.name}
                </p>
                <p className="text-base-color text-xs">Admin</p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Topbar;
