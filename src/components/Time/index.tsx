import { ITime } from "./interface";
import "./time.scss";
import { ReactComponent as Galochki } from "../../assets/my_message.svg";
export const Time = ({ my = false, date }: ITime) => {
  const time = new Date(date * 1000).toLocaleTimeString("ru", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="time">
      <time>{time}</time>
      {my ?? <Galochki />}
    </div>
  );
};
