import { Avatar } from "../Avatar";
import { IMessage } from "./interface";
import { Time } from "../Time";
import styles from "./message.module.scss";
export const Message = ({ message, isShowAvatar }: IMessage) => {
  return (
    <div className={styles.message}>
      {isShowAvatar && <Avatar src={message.user.avatar} />}
      {isShowAvatar && (
        <span
          className={styles.messageUserName}
        >{`${message.user.name} ${message.user.surname}`}</span>
      )}
      <div
        className={`${styles.messageTextContainer} ${
          message.user.you ? styles.myMessage : ""
        }`}
      >
        <span className={styles.messageText}>{message.message}</span>
        <div className={styles.messageTimeContainer}>
          <Time date={message.created_at} my={message.user.you} />
        </div>
      </div>
    </div>
  );
};
