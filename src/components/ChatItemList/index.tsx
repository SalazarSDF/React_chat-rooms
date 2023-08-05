import { useSelector } from "react-redux";
import {
  getChatsStatus,
  getAllChats,
} from "../../pages/great-project/features/chats-slice";
import { Spinner } from "../Spiner";
import { Header } from "../Header";
import styles from "./chat-item-list.module.scss";
import { ChatItem } from "../ChatItem";


export const ChatItemList = () => {
  const chats = useSelector(getAllChats);
  const chatsStatus = useSelector(getChatsStatus);
  return (
    <>
      {chatsStatus === "loading" ? (
        <Spinner />
      ) : (
        <ul className={styles.chatItemList}>
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
