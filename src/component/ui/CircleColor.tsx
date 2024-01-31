import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
const CircleColor = ({ color, ...rest }:IProps) => {
  return (
    <span className={"cursor-pointer block w-5 h-5 rounded-full mb-1"} style={{ background: `${color}` }} {...rest}/>
  );
};

export default CircleColor;
