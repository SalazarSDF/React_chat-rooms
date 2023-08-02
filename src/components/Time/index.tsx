import { ITime } from "./interface";
import "./time.scss";
export const Time = ({ my, date }: ITime) => {
  const time = new Date(date).toLocaleTimeString();
  const [hours, minutes] = time.split(":");
  return (
    <div className="time">
      <time>{`${hours}:${minutes}`}</time>
    </div>
  );
};
