import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import ProductCard from "./component/ProductCard";
import { FormList, Colors, productList, categories } from "./component/data";
import Modal from "./component/ui/Modal";
import Button from "./component/ui/Button";
import Input from "./component/ui/Input";
import { IProduct } from "./type";
import { validationForm } from "./validations";
import { ErrorMass } from "./component/ui/ErrorMass";
import CircleColor from "./component/ui/CircleColor";
import Select from "./component/ui/Select";
import React from "react";

function App() {

  ///// STATE //////
  const defaultDate = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  const [selected, setSelected] = useState(categories[0]);

  const [isOpen, setIsOpen] = useState(false);

  const [indexProduct, setIndexProduct] = useState<number>(0);

  const [deleteIndexProduct, setDeleteIndexProduct] =
    useState<IProduct>(defaultDate);

  const [isOpenEditProduct, setIsOpenEditProduct] = useState(false);

  const [opendeleteConfimration, setOpenDeleteConfimration] = useState(false);

  const [tempColor, setTempColor] = useState<string[]>([]);

  const [error, setError] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });

  const [products, setProducts] = useState<IProduct[]>(productList);
  const [feildData, setFeildData] = useState<IProduct>(defaultDate);
  const [editProduct, setEditProduct] = useState<IProduct>(defaultDate);

  ///// handlers /////

  const closeModal = () => {
    setError({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: "",
    });
    setIsOpen(false);
    setFeildData(defaultDate);
    setTempColor([]);
  };

  const closeEditModal = () => {
    setError({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: "",
    });
    setIsOpenEditProduct(false);
  };
  const closeDeleteModal = () => {
    setOpenDeleteConfimration(false);
  };

  const openModal = () => setIsOpen(true);
  const onEditModel = () => setIsOpenEditProduct(true);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setFeildData({
      ...feildData,
      [name]: value,
    });

    setError({
      ...error,
      [name]: "",
    });
  };
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setEditProduct({
      ...editProduct,
      [name]: value,
    });

    setError({
      ...error,
      [name]: "",
    });
  };

  const saveColors = (color: string) => {
    if (tempColor.includes(color)) {
      setTempColor((prev) => prev.filter((item) => item !== color));
      return;
    }
    if (editProduct.colors.includes(color)) {
      setTempColor((prev) => prev.filter((item) => item !== color));
      return;
    }
    setTempColor((prev) => [...prev, color]);
    setError({
      ...error,
      colors: "",
    });
  };

  const DeleteObjFormProducts = () => {
    const removeProduct = products.filter(
      (product) => product !== deleteIndexProduct
    );
    setProducts(removeProduct);
    setOpenDeleteConfimration(false);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { title, description, imageURL, price } = feildData;
    const errors = validationForm({
      title,
      description,
      imageURL,
      price,
      tempColor,
    });

    const handleError =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");

    if (!handleError) {
      setError(errors);
      return;
    }

    setProducts((prev) => [
      { ...feildData, id: uuid(), colors: tempColor, category: selected },
      ...prev,
    ]);
    setFeildData(defaultDate);
    setTempColor([]);
    closeModal();
  };

  const submitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = editProduct;
    const errors = validationForm({
      title,
      description,
      imageURL,
      price,
      tempColor,
    });
    const updatedProduct = [...products];
    updatedProduct[indexProduct] = {
      ...editProduct,
      colors: tempColor.concat(editProduct.colors),
      category: selected,
    };
    setProducts(updatedProduct);

    const handleError =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");

    if (!handleError) {
      setError(errors);
      return;
    }

    setEditProduct(defaultDate);
    setTempColor([]);
    closeEditModal();
  };
  ///// rendering /////

  const renderingProductCard = products.map((product, idx) => (
    <ProductCard
      idx={idx}
      key={product.id}
      product={product}
      setEditProduct={setEditProduct}
      setOpenDeleteConfimration={setOpenDeleteConfimration}
      setIndexProduct={setIndexProduct}
      setDeleteIndexProduct={setDeleteIndexProduct}
      onEditModel={onEditModel}
    />
  ));

  const renderingFormInput = FormList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[2px]">
        {input.label}
      </label>
      <Input
        name={input.name}
        type={input.type}
        value={feildData[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMass mass={error[input.name]} />
    </div>
  ));

  const renderingEditFormInput = FormList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[2px]">
        {input.label}
      </label>
      <Input
        name={input.name}
        type={input.type}
        value={editProduct[input.name]}
        onChange={onChangeEditHandler}
      />
      <ErrorMass mass={error[input.name]} />
    </div>
  ));

  const renderCircleColors = Colors.map((color) => (
    <CircleColor key={color} color={color} onClick={() => saveColors(color)} />
  ));

  return (
    <div className="container">
      <Button
        className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium"
        onClick={openModal}
        width="w-fit"
      >
        Build a Product
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-5 gap-2 md:gap-4 p-2">
        {renderingProductCard}
      </div>
      <Modal title={"Add Products"} isOpen={isOpen} closeModal={closeModal}>
        <div className="flex flex-col">
          <form className="space-y-3" onSubmit={submitHandler}>
            {renderingFormInput}
            <Select selected={selected} setSelected={setSelected} />
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-1 cursor-pointer">
                {renderCircleColors}
              </div>
              <ErrorMass mass={error.colors} />
            </div>
            <div className="flex flex-wrap gap-1">
              {tempColor.map((item) => (
                <span
                  className="rounded-lg p-1 text-sm mb-1 text-white"
                  style={{ background: item }}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800">
                SUBMIT
              </Button>
              <Button
                type="reset"
                onClick={closeModal}
                className="bg-gray-400 hover:bg-gray-500"
              >
                CLOSE
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        title={"Edit Products"}
        isOpen={isOpenEditProduct}
        closeModal={closeDeleteModal}
      >
        <div className="flex flex-col">
          <form className="space-y-3" onSubmit={submitEditHandler}>
            {renderingEditFormInput}
            <Select
              selected={editProduct.category}
              setSelected={(value) => {
                setEditProduct({ ...editProduct, category: value });
              }}
            />
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-1 cursor-pointer">
                {renderCircleColors}
              </div>
              <ErrorMass mass={error.colors} />
            </div>
            <div className="flex flex-wrap gap-1">
              {tempColor.concat(editProduct.colors).map((item) => (
                <span
                  className="rounded-lg p-1 text-sm mb-1 text-white"
                  style={{ background: item }}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800">
                SUBMIT
              </Button>
              <Button
                type="reset"
                onClick={closeEditModal}
                className="bg-red-700 hover:bg-red-600"
              >
                CLOSE
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={opendeleteConfimration}
        closeModal={closeDeleteModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex justify-between gap-2">
          <Button
            onClick={DeleteObjFormProducts}
            className="bg-indigo-700 hover:bg-indigo-800"
          >
            Yes, Remove
          </Button>
          <Button
            onClick={closeDeleteModal}
            className="bg-red-700 hover:bg-red-600"
          >
            cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
