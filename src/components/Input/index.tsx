import styles from "./input.module.scss";
import { ReactComponent as SendSvg } from "../../assets/send.svg";
import { ReactComponent as ScrepkaSvg } from "../../assets/screpka.svg";
export const Input = () => {
  return (
    <>
      <div
        className={styles.input}
        placeholder="Type message"
        contentEditable="true"
      />
      <div className={styles.inputSvgContainer}>
        <ScrepkaSvg className={styles.inputSvg} />
        <SendSvg className={styles.inputSvg} />
      </div>
    </>
  );
};
