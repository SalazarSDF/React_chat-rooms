import { IChatItem } from "./interface";
import { Avatar } from "../Avatar";
import { Time } from "../Time";
import styles from "./chat-item.module.scss";

export const ChatItem = ({ item }: IChatItem) => {
  return (
    <li className={`${styles.chatItem}`}>
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
