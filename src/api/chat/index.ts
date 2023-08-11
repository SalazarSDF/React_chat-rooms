import { wrapper } from "../../utils/wrapper";
import { URLS } from "../../constants/urls";

export const getChatList = () => {
  return wrapper({
    method: "get",
    url: URLS.LIST,
    headers: { version: "0.0" },
  });
};

export const getMessageList = (chatId: string) => {
  return wrapper({
    method: "get",
    url: `${URLS.MESSAGES}chat_id=${chatId}&offset=0&limit=50`,
    headers: { version: "0.0" },
  });
};
