import { FC } from "react";
import { IPage } from "../../interface/page";
import GreatProject from "../great-project/great-project";

export const PageIndex: FC<IPage> = (props: IPage) => {
  const { title } = props;
  return <GreatProject title={title} />;
};

