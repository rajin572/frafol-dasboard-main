/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "antd";
import { useEffect, useState, useMemo, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useGetConversationListQuery } from "../../redux/features/conversation/conversationApi";
import { FadeLoader } from "react-spinners";
import ConversationChatListCard from "./ConversationChatListCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectSelectedChatUser,
  setOnlineUsers,
} from "../../redux/features/conversation/conversationSlice";
import { useSocket } from "../../context/socket-context";
import { IConversation } from "../../types/conversation.type";
import { BiSolidPlusCircle } from "react-icons/bi";
import CreateConversationModal from "../../ui/Modal/Conversation/CreateConversationModal";

const ConversationChatList = ({ userData, onlineUsers }: any) => {
  const socket = useSocket()?.socket;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const seletedConversation = useAppSelector(selectSelectedChatUser);
  const [chatList, setChatList] = useState<IConversation[]>([]);

  const { data: allChatList, isFetching: isAllChatFeacthing } =
    useGetConversationListQuery(
      {
        search: searchTerm,
      },
      {
        skip: !userData?.userId,
      }
    );

  const handleNewMessage = useCallback((message: any) => {
    const { chatId, text: rawText, sender, time: rawTime } = message;
    // A picture without text would otherwise leave the preview empty.
    const text = rawText || (message?.images?.length > 0 ? "Image" : "");
    // Guarantee a valid, recent timestamp so the conversation sorts to the top.
    const time = rawTime || message?.createdAt || new Date().toISOString();

    // Find if this conversation already exists
    setChatList((prevChatList: IConversation[]) => {
      const existingIndex = prevChatList.findIndex(
        (item) => item.chat._id === chatId
      );

      if (existingIndex !== -1) {
        // Update the existing conversation's lastMessage and updatedAt
        const updated: IConversation = {
          ...prevChatList[existingIndex],
          lastMessage: text,
          lastMessageSender: sender?._id,
          lastMessageCreatedAt: time,
          unreadMessageCount: (prevChatList[existingIndex].unreadMessageCount || 0) + 1,
        };
        return [updated, ...prevChatList.filter((_, index) => index !== existingIndex)];
      } else {
        // If this is a new conversation
        const newConversation: IConversation = {
          chat: {
            _id: chatId,
            users: [sender], // you might need to merge with self if needed
            createdBy: sender?._id,
            unreadCounts: 1,
            blockedUsers: null,
            createdAt: time,
            updatedAt: time,
            __v: 0,
          },
          lastMessage: text,
          lastMessageSender: sender?._id,
          unreadMessageCount: 1,
          message: text,
          lastMessageCreatedAt: time,
        };
        return [newConversation, ...prevChatList];
      }
    });
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }
    const onNewMessage = (message: any) => {
      handleNewMessage(message);
    };
    const onOnlineUser = (online: any) => {
      dispatch(setOnlineUsers(online));
    };

    socket.on(`newMessage`, onNewMessage);
    socket.on("onlineUser", onOnlineUser);

    // Remove exactly the handlers added above. The old cleanup passed brand-new functions to
    // `off`, which removes nothing, so every re-run stacked another set of listeners.
    return () => {
      socket.off("onlineUser", onOnlineUser);
      socket.off("newMessage", onNewMessage);
    };
  }, [dispatch, handleNewMessage, socket, userData?.userId]);

  useEffect(() => {
    if (allChatList?.data) {
      setChatList(allChatList?.data);
    }
  }, [allChatList?.data]);

  const filteredConversations = useMemo(() => {
    return chatList?.slice()?.sort((a: any, b: any) => {
      const dateA = new Date(a?.lastMessageCreatedAt || 0).getTime();
      const dateB = new Date(b?.lastMessageCreatedAt || 0).getTime();
      return dateB - dateA;
    });
  }, [chatList]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`w-full lg:w-[400px] border-r-2 border-secondary-color/20 overflow-y-auto px-3 ${seletedConversation ? "hidden lg:block" : "block lg:block"
        }`}
    >
      <div className="sticky top-0 z-20   py-5 mb-3 !bg-primary-color">
        <div className=" flex justify-between items-center gap-4 mt-3">
          <h4 className="text-base sm:text-xl md:text-2xl lg:text-3xl text-secondary-color font-bold ">Messages</h4>
          <BiSolidPlusCircle
            className="text-3xl text-secondary-color cursor-pointer"
            onClick={handleOpenModal}
          />
        </div>
        <Input
          placeholder="Search Conversations"
          prefix={<SearchOutlined className="text-[#F88D58] text-xl" />}
          className="!bg-[#EFEFEF] text-base-color mt-2 !py-3 !px-2 w-full"
          onChange={handleSearch}
        />
      </div>
      {isAllChatFeacthing ? (
        <div className="flex justify-center items-center">
          <FadeLoader color="#28314E" />
        </div>
      ) : (
        <div className="h-fit mb-3">
          <div className=" text-gray-300 bg-white   ">
            {filteredConversations?.map((conversation: IConversation) => {
              // Compute the image source URL
              const imageUrlSrc = conversation?.chat?.users?.[0]?.profileImage;

              // Return the JSX
              return (
                <ConversationChatListCard
                  key={conversation?.chat?._id}
                  conversation={conversation}
                  imageUrlSrc={imageUrlSrc}
                  onlineUsers={onlineUsers}
                />
              );
            })}
          </div>
        </div>
      )}
      <CreateConversationModal isAddModalVisible={isModalOpen} handleCancel={handleCloseModal} />
    </div>
  );
};

export default ConversationChatList;
