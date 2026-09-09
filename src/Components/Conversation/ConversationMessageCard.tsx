/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from "../../types/conversation.type";
import { formatDateTime } from "../../utils/dateFormet";
import ImagePreviewer from "../../utils/ImagePreviewer";

const ConversationMessageCard = ({
  msg,
  userData,
  imageUrl,
}: {
  msg: IMessage;
  userData: any;
  imageUrl: string;
}) => {
  return (
    <div>
      <div>
        <div className="flex items-start gap-1 mb-2">
          {/* {msg?.sender?._id !== null && (
            <Image
              loading="lazy"
              src={
                msg?.sender?._id?.petImage
                  ? imageUrl + msg.sender.petImage
                  : msg?.image
                  ? imageUrl + msg.image
                  : "/assets/images/user.png"
              }
              width={1000}
              height={1000}
              alt="Profile"
              className={`h-6 w-6 object-cover rounded-md relative mt-2 ${
                msg?.sender?._id === userData?.userId ||
                msg?.sender?._id?.toString() === userData?.userId
                  ? "order-last"
                  : "order-first"
              }`}
              sizes="100vw"
            />
          )} */}
          <div
            className={`flex items-center gap-2 w-full ${
              msg?.sender?._id === userData?.userId ||
              msg?.sender === userData?.userId ||
              msg?.sender?._id?.toString() === userData?.userId
                ? "justify-end"
                : msg?.sender !== null
                ? "justify-start"
                : "justify-center"
            }`}
          >
            <div>
              {msg?.images?.length > 0 && (
                <div
                  className={`grid grid-cols-1  ${
                    msg?.images?.length > 2 ? " md:grid-cols-2" : "grid-cols-1"
                  } rounded-md ${
                    msg?.sender?._id === userData?.userId ||
                    msg?.sender === userData?.userId ||
                    msg?.sender?._id?.toString() === userData?.userId
                      ? "w-fit ml-auto text-right text-white "
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  {msg?.images?.map((item: string, index: number) => (
                    <ImagePreviewer
                      key={index}
                      msg={msg}
                      imageUrl={imageUrl}
                      image={item}
                      userData={userData}
                    />
                  ))}
                </div>
              )}
              {msg?.text?.length > 0 && (
                <p
                  className={`py-1 px-3 mt-0.5 rounded-md ${
                    msg?.sender?._id === userData?.userId ||
                    msg?.sender === userData?.userId ||
                    msg?.sender?._id?.toString() === userData?.userId
                      ? "w-fit ml-auto text-right  text-white bg-secondary-color"
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  {msg?.text}
                </p>
              )}

              {msg?.sender?._id !== null && (
                <p
                  className={`text-[11px] mt-0.5 text-secondary-color ${
                    msg?.sender?._id === userData?.userId ||
                    msg?.sender === userData?.userId ||
                    msg?.sender?._id?.toString() === userData?.userId
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {formatDateTime(msg?.createdAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationMessageCard;
