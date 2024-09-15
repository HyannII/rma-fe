import React, { ChangeEvent, FormEvent, useState } from "react";
import Header from "@/app/(components)/Header";
import { SearchIcon } from "lucide-react";

type GoodsFormData = {
  quantity: number;
  name: string;
  type: string;
  averageImportPrice: number;
  weight: number;
  unit: string;
  sellingPrice: number;
};

type CreateGoodsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (goodsData: GoodsFormData) => void;
};

const CreateGoodsModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateGoodsModalProps) => {
  const [formData, setFormData] = useState({
    goodsId: +1,
    quantity: 0,
    name: "",
    type: "",
    averageImportPrice: 0,
    weight: 0,
    unit: "",
    sellingPrice: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Goods" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* GOODS NAME */}
          <label htmlFor="goodsName" className={labelCssStyles}>
            Goods Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          {/* AVERAGE IMPORT PRICE */}
          <label htmlFor="AverageImportPrice" className={labelCssStyles}>
            Average Import Price
          </label>
          <input
            type="number"
            name="averageImportPrice"
            placeholder="AverageImportPrice"
            onChange={handleChange}
            value={formData.averageImportPrice}
            className={inputCssStyles}
            required
          />

          {/* QUANTITY */}
          <label htmlFor="Quantity" className={labelCssStyles}>
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            value={formData.quantity}
            className={inputCssStyles}
            required
          />

          {/* TYPE */}
          <label htmlFor="Type" className={labelCssStyles}>
            Type
          </label>
          <input
            type="text"
            name="type"
            placeholder="Type"
            onChange={handleChange}
            value={formData.type}
            className={inputCssStyles}
            required
          />

          {/* UNIT */}
          <label htmlFor="Unit" className={labelCssStyles}>
            Unit
          </label>
          <input
            type="text"
            name="unit"
            placeholder="Unit"
            onChange={handleChange}
            value={formData.unit}
            className={inputCssStyles}
            required
          />

          {/* WEIGHT */}
          <label htmlFor="weight" className={labelCssStyles}>
            Weight
          </label>
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            onChange={handleChange}
            value={formData.weight}
            className={inputCssStyles}
            required
          />

          {/* SELLING PRICE */}
          <label htmlFor="sellingPrice" className={labelCssStyles}>
            Selling Price
          </label>
          <input
            type="number"
            name="sellingPrice"
            placeholder="SellingPrice"
            onChange={handleChange}
            value={formData.sellingPrice}
            className={inputCssStyles}
            required
          />

          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGoodsModal;
