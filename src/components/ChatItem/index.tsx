import { IChatItem } from "./interface";
import { Avatar } from "../Avatar";
import { Time } from "../Time";
import styles from "./chat-item.module.scss";
import { setActiveMessage } from "../../pages/great-project/features/chats-slice";
import { useAppDispatch } from "../../store";
import { fetchMessages } from "../../pages/great-project/features/messages-slice";

export const ChatItem = ({ item, selected }: IChatItem) => {
  const dispatch = useAppDispatch();
  return (
    <li
      onClick={() => {
        dispatch(setActiveMessage({ messageId: item.id }));
        dispatch(fetchMessages(item.id));
      }}
      className={`${styles.chatItem} ${selected ? styles.selected : ""}`}
    >
      <div className={styles.chatItemAvatar}>
        <Avatar size="md" src={item.avatar} />
      </div>
      <div className={styles.chatItemTime}>
        <Time my={item.last_message.you} date={item.created_at} />
      </div>
      <span className={styles.chatItemTitle}>{item.title}</span>
      <span className={styles.chatItemMessage}>
        {item.last_message.message}
      </span>
    </li>
  );
};
