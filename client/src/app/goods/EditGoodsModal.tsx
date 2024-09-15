import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Header from "@/app/(components)/Header";

type GoodsFormData = {
  id: number;
  quantity: number;
  name: string;
  type: string;
  averageImportPrice: number;
  weight: number;
  unit: string;
  sellingPrice: number;
};

type EditGoodsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (formData: GoodsFormData) => void;
  goodsData: GoodsFormData | null; // Allow null value for initial check
};

const EditGoodsModal = ({
  isOpen,
  onClose,
  onEdit,
  goodsData,
}: EditGoodsModalProps) => {
  // Initialize formData with default values
  const [formData, setFormData] = useState<GoodsFormData>({
    id: 0,
    quantity: 0,
    name: "",
    type: "",
    averageImportPrice: 0,
    weight: 0,
    unit: "",
    sellingPrice: 0,
  });

  useEffect(() => {
    if (goodsData) {
      setFormData(goodsData);
    }
  }, [goodsData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "averageImportPrice" ||
        name === "weight" ||
        name === "sellingPrice" ||
        name === "quantity"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Edit Goods" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* GOODS NAME */}
          <label htmlFor="name" className={labelCssStyles}>
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
          <label htmlFor="averageImportPrice" className={labelCssStyles}>
            Average Import Price
          </label>
          <input
            type="number"
            name="averageImportPrice"
            placeholder="Average Import Price"
            onChange={handleChange}
            value={formData.averageImportPrice}
            className={inputCssStyles}
            required
          />

          {/* QUANTITY */}
          <label htmlFor="quantity" className={labelCssStyles}>
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
          <label htmlFor="type" className={labelCssStyles}>
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
          <label htmlFor="unit" className={labelCssStyles}>
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
            placeholder="Selling Price"
            onChange={handleChange}
            value={formData.sellingPrice}
            className={inputCssStyles}
            required
          />

          {/* SAVE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Save
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

export default EditGoodsModal;
