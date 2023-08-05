import { ITime } from "./interface";
import "./time.scss";
export const Time = ({ my, date }: ITime) => {
  const time = new Date(date).toLocaleTimeString("ru", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="time">
      <time>{time}</time>
    </div>
  );
};
