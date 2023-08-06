import { getActiveMessageId } from "../../pages/great-project/features/chats-slice";
import { useSelector } from "react-redux";
import {
  fetchMessage,
  getMessageStatus,
} from "../../pages/great-project/features/message-slice";
import { useAppDispatch } from "../../store";
import { Spinner } from "../Spiner";
import { useEffect } from "react";
export const Message = () => {
  const dispatch = useAppDispatch();
  const activeMessageId = useSelector(getActiveMessageId);
  const messageStatus = useSelector(getMessageStatus);

  useEffect(() => {
    if (messageStatus === "idle" && activeMessageId) {
      dispatch(fetchMessage(activeMessageId));
    }
  }, [activeMessageId, dispatch, messageStatus]);

  if (messageStatus === "loading") {
    return <Spinner />;
  }

  return <h1>Its message here</h1>;
};
