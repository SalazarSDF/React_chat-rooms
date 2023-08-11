import { ISystemMessageDate, ISystemMessageText } from "./interface";
import styles from "./system-message-date.module.scss";
export const SystemMessage = (
  props: ISystemMessageDate | ISystemMessageText
) => {
  if (props.type === "date") {
    return (
      <div className={styles.systemMessageDate}>
        <span className={styles.systemMessageDateValue}>
          {new Date(props.date * 1000).toLocaleDateString("ru")}
        </span>
      </div>
    );
  } else if (props.type === "new-messages") {
    return (
      <div className={styles.systemMessageText}>
        <span className={styles.systemMessageTextValue}>Новые сообщения</span>
      </div>
    );
  }
};
