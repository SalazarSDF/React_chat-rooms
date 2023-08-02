import "./header.scss";
import { ReactComponent as HeaderSvg } from "../../assets/Shape.svg";
import { IHeader } from "./interface";
export const Header = ({ title, isShowSvg = true }: IHeader) => {
  return (
    <div className="header">
      {isShowSvg && <HeaderSvg />}
      <span className="header__title">{title}</span>
    </div>
  );
};
