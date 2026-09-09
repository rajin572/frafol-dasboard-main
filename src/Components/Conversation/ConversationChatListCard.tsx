/* eslint-disable @typescript-eslint/no-explicit-any */
import { getImageUrl } from "../../helpers/config/envConfig";
import {
  selectSelectedChatUser,
  setSelectedChatUser,
} from "../../redux/features/conversation/conversationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IConversation } from "../../types/conversation.type";
import { formatDateTime } from "../../utils/dateFormet";

interface IConversationChatListCardProps {
  conversation: IConversation;
  imageUrlSrc: string;
  onlineUsers: any[];
}

const ConversationChatListCard = ({
  conversation,
  imageUrlSrc,
  onlineUsers,
}: IConversationChatListCardProps) => {
  const imageUrl = getImageUrl();
  const dispatch = useAppDispatch();
  const selectedConversation = useAppSelector(selectSelectedChatUser);
  const handleConversationSelect = (conversation: IConversation) => {
    // setSelectedConversation(conversation);
    dispatch(setSelectedChatUser(conversation));
  };

  return (
    <div
      onClick={() => handleConversationSelect(conversation)}
      className={`m-1 rounded  border-b border-secondary-color/10 bg-secondary-color/10 text-black ${conversation?.chat?._id === selectedConversation?.chat?._id
        ? "!bg-secondary-color text-white"
        : ""
        }`}
    >
      <div className="py-4 px-2 cursor-pointer">
        <div className="flex items-center gap-2">
          <img
            loading="lazy"
            className="rounded-full aspect-square h-12 w-fit object-cover relative"
            src={imageUrl + "/" + imageUrlSrc}
            width={100}
            height={100}
            alt="Profile"
          />
          <div className="w-full mt-1">
            <div className="flex items-center gap-1 text-xl">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <p>
                    {/* {conversation?.users?.[0]?._id === userData?._id
                      ? conversation?.users?.[1]?.petName.length > 10
                        ? `${conversation?.users?.[1]?.petName.slice(0, 10)}...`
                        : conversation?.users?.[1]?.petName
                      : conversation?.users?.[0]?.petName.length > 10
                      ? `${conversation?.users?.[0]?.petName.slice(0, 10)}...`
                      : conversation?.users?.[0]?.petName} */}
                    {conversation?.chat?.users?.[0]?.name?.length > 15
                      ? `${conversation?.chat?.users?.[0]?.name.slice(
                        0,
                        15
                      )}...`
                      : conversation?.chat?.users?.[0]?.name}
                  </p>
                  {onlineUsers?.includes(
                    conversation?.chat?.users?.[0]?._id
                  ) && <div className="size-2 rounded-full bg-green-500"></div>}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="text-sm">
                {conversation?.lastMessage
                  ? `${conversation?.lastMessage.slice(0, 10)}...`
                  : ""}
              </div>
              <div className="text-xs">
                {conversation?.lastMessageCreatedAt
                  ? formatDateTime(conversation?.lastMessageCreatedAt)
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationChatListCard;
