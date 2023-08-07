import { getActiveMessageId } from "../../pages/great-project/features/chats-slice";
import { useSelector } from "react-redux";
import {
  fetchMessages,
  getMessages,
  getMessagesStatus,
} from "../../pages/great-project/features/messages-slice";
import { Spinner } from "../Spiner";
import { useAppDispatch } from "../../store";
import { useEffect } from "react";
import { Message } from "../Message";

export const MessagesList = () => {
  const dispatch = useAppDispatch();
  const activeMessageId = useSelector(getActiveMessageId);
  const messagesStatus = useSelector(getMessagesStatus);
  const messages = useSelector(getMessages);

  useEffect(() => {
    if (messagesStatus === "idle" && activeMessageId) {
      dispatch(fetchMessages(activeMessageId));
    }
  }, [activeMessageId, dispatch, messagesStatus]);

  return (
    <>
      {messagesStatus === "loading" ? (
        <Spinner />
      ) : (
        <div>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      )}
    </>
  );
};
