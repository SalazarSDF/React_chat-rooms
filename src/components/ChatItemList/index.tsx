import { useSelector } from "react-redux";
import {
  getChatsStatus,
  getAllChats,
} from "../../pages/great-project/features/chats-slice";
import { Spinner } from "../Spiner";
import { IChatItem } from "./interface";
import { Avatar } from "../Avatar";
import { Time } from "../Time";
import "./chat-item-list.scss";
import { Header } from "../Header";

const ChatItem = ({ item }: IChatItem) => {
  return (
    <li className="chat-item-list__item chat-item active">
      <div className="chat-item__avatar">
        <Avatar size="md" src={item.avatar} />
      </div>
      <div className="chat-item__time">
        <Time my={item.last_message.you} date={item.created_at} />
      </div>
      <span className="chat-item__title">{item.title}</span>
      <span className="chat-item__message">{item.last_message.message}</span>
    </li>
  );
};

export const ChatItemList = () => {
  const chats = useSelector(getAllChats);
  const chatsStatus = useSelector(getChatsStatus);
  return (
    <>
      {chatsStatus === "loading" ? (
        <Spinner />
      ) : (
        <ul className="chat-item-list">
          <li>
            <Header title="All chats" isShowSvg={false} />
          </li>
          {chats.map((chat) => (
            <ChatItem key={chat.id} item={chat} />
          ))}
        </ul>
      )}
    </>
  );
};
