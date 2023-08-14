import { getActiveMessageId } from "../../pages/great-project/features/chats-slice";
import { useSelector } from "react-redux";
import {
  fetchMessages,
  getMessages,
  getMessagesStatus,
} from "../../pages/great-project/features/messages-slice";
import { Spinner } from "../Spiner";
import { useAppDispatch } from "../../store";
import { Fragment, useEffect, useRef } from "react";
import { Message } from "../Message";
import styles from "./messages-list.module.scss";
import { SystemMessage } from "../SystemMessage";
import { Input } from "../Input";

export const MessagesList = () => {
  const dispatch = useAppDispatch();
  const activeMessageId = useSelector(getActiveMessageId);
  const messagesStatus = useSelector(getMessagesStatus);
  const messages = useSelector(getMessages);
  const newMessagesRef = useRef<HTMLParagraphElement>(null);
  //const activeMessageIdRef = useRef<string>(activeMessageId);

  useEffect(() => {
    if (messagesStatus === "idle" && activeMessageId) {
      dispatch(fetchMessages(activeMessageId));
    }
  }, [activeMessageId, dispatch, messagesStatus]);

  useEffect(() => {
    if (newMessagesRef && newMessagesRef.current) {
      newMessagesRef.current.scrollIntoView(true);
    }
  }, []);

  const checkIsNewDay = ({
    yesterday,
    today,
  }: {
    yesterday: number | undefined;
    today: number;
  }): boolean =>
    yesterday
      ? new Date(yesterday).getDate() < new Date(today).getDate()
      : true;
  const newMessagesIndex = messages.findIndex((message) => message.is_new);

  return (
    <Fragment>
      {messagesStatus === "loading" ? (
        <Spinner />
      ) : (
        <div className={styles.chatWindow}>
          {messages.map((message, index) => {
            const today = message.created_at;
            const yesterday: number | undefined =
              messages[index - 1]?.created_at;
            const isSameUser = message.user.id === messages[index - 1]?.user.id;

            return (
              <Fragment key={message.id}>
                {checkIsNewDay({ today, yesterday }) && (
                  <div className={styles.chatWindowSystemMessage}>
                    <SystemMessage type="date" date={today} />
                  </div>
                )}
                {newMessagesIndex === index && (
                  <div className={styles.chatWindowSystemMessage}>
                    <SystemMessage type="new-messages" />
                  </div>
                )}
                <div
                  className={`${styles.chatWindowMessage} ${
                    message.user.you ? styles.you : ""
                  } ${isSameUser ? styles.SameUser : ""}`}
                  key={message.id}
                >
                  <Message
                    message={message}
                    isShowAvatar={!isSameUser && !message.user.you}
                  />
                </div>
              </Fragment>
            );
          })}
          <div className={styles.chatWindowInput}>
            <Input />
          </div>
        </div>
      )}
    </Fragment>
  );
};
