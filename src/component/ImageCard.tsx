import React from "react";
import { IImage } from "../type";

const Image = (props: IImage) => {
  return (
    <div>
      <img className={props.className} src={props.imageURL} alt={props.alt} />
    </div>
  );
};

export default Image;
