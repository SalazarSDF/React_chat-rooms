import { wrapper } from "../../utils/wrapper";
import { URLS } from "../../constants/urls";

export const getChatList = () => {
  return wrapper({
    method: "get",
    url: URLS.LIST,
    headers: { version: "0.0" },
  });
};

