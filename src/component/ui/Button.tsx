import { IButton } from "../../type";

const Button = ({ children, className, width = "w-full", ...rest }: IButton) => {
  return <button {...rest}  className={`${className} ${width} cursor-pointer rounded-lg p-2 text-white`}>{children}</button>;
};

export default Button;
