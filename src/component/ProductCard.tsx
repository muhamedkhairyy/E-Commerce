import Button from "./ui/Button";
import Image from "./ImageCard";
import { IChildOfProduct } from "../type";
import { txtCuter } from "./../utility/functions";
import CircleColor from "./ui/CircleColor";
import React from "react";

const ProductCard = ({
  product,
  setEditProduct,
  onEditModel,
  idx,
  setIndexProduct,
  setDeleteIndexProduct,
  setOpenDeleteConfimration
}: IChildOfProduct) => {
  const { title, description, category, imageURL, price, colors } = product;

  const onEdit = () => {
    setIndexProduct(idx);
    setEditProduct(product);
    onEditModel();
  };
  const openDeleteMass = () => {
    console.log(idx);
    setOpenDeleteConfimration(true);
    setDeleteIndexProduct(product);
  };

  const renderCircleColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-lg p-2">
      <Image
        className="rounded-lg w-full h-52 lg:object-cover mb-3"
        imageURL={imageURL}
        alt={title}
      />
      <h2 className="mb-2 font-bold">{txtCuter(title, 30)}</h2>
      <p className="mb-2 h-12 text-sm leading-5">{txtCuter(description)}</p>
      <div className="flex flex-wrap gap-1 cursor-pointer mb-2">
        {renderCircleColors}
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="text-indigo-600">${price}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm">{category.name}</span>
          <Image
            className="rounded-full w-10 h-10 object-bottom"
            imageURL={category.imageURL}
            alt={category.name}
          />
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <Button className="bg-indigo-600" onClick={onEdit}>
          Edit
        </Button>
        <Button onClick={openDeleteMass} className="bg-red-600">Remove</Button>
      </div>
    </div>
  );
};

export default ProductCard;
