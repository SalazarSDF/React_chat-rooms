import { Avatar } from "../Avatar";
import { IMessage } from "./interface";
import { Time } from "../Time";
export const Message = ({ message }: IMessage) => {
  return (
    <>
      <Avatar src={message.user.avatar} />
      <span>{message.message}</span>
      <Time date={message.created_at} my={message.user.you} />
    </>
  );
};
