import React, { ChangeEvent, FormEvent, useState } from "react";
import Header from "@/app/(components)/Header";
import { useGetIngredientsQuery } from "@/state/api";

type DishFormData = {
  name: string;
  type: string;
  unit: string;
  price: number;
  ingredients: { goodsId: number; quantity: number }[];
};

type CreateDishModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: DishFormData) => void;
};

const CreateDishModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateDishModalProps) => {
  const [formData, setFormData] = useState({
    dishId: +1,
    name: "",
    type: "",
    unit: "",
    price: 0,
  });
  const [selectedIngredients, setSelectedIngredients] = useState<
    { goodsId: number; quantity: number }[]
  >([]);
  const [currentIngredientId, setCurrentIngredientId] = useState<number | null>(
    null
  );
  const [currentQuantity, setCurrentQuantity] = useState<number>(0);

  const { data: ingredients = [] } = useGetIngredientsQuery();

  const handleIngredientChange = (goodsId: number, quantity: number) => {
    setSelectedIngredients((prev) => {
      const existing = prev.find((item) => item.goodsId === goodsId);
      if (existing) {
        return prev.map((item) =>
          item.goodsId === goodsId ? { ...item, quantity } : item
        );
      } else {
        return [...prev, { goodsId, quantity }];
      }
    });
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleAddIngredient = () => {
    if (currentIngredientId !== null && currentQuantity > 0) {
      handleIngredientChange(currentIngredientId, currentQuantity);
      setCurrentIngredientId(null);
      setCurrentQuantity(0);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dishData = {
      ...formData,
      ingredients: selectedIngredients,
    };
    onCreate(dishData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Dish" />
        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="name" className={labelCssStyles}>
            Dish Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleFormChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          <label htmlFor="price" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleFormChange}
            value={formData.price}
            className={inputCssStyles}
            required
          />

          <label htmlFor="unit" className={labelCssStyles}>
            Unit
          </label>
          <input
            type="text"
            name="unit"
            placeholder="Unit"
            onChange={handleFormChange}
            value={formData.unit}
            className={inputCssStyles}
            required
          />

          <label htmlFor="type" className={labelCssStyles}>
            Type
          </label>
          <input
            type="text"
            name="type"
            placeholder="Type"
            onChange={handleFormChange}
            value={formData.type}
            className={inputCssStyles}
            required
          />

          {/* Ingredients */}
          <h3 className="mt-4">Ingredients</h3>
          <div className="flex items-center mb-2">
            <select
              value={currentIngredientId ?? ""}
              onChange={(e) =>
                setCurrentIngredientId(parseInt(e.target.value, 10))
              }
              className="w-full p-2 border-gray-300 border rounded-md"
            >
              <option value="" disabled>
                Select Ingredient
              </option>
              {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              value={currentQuantity}
              onChange={(e) => setCurrentQuantity(parseInt(e.target.value, 10))}
              className="ml-2 w-20 p-1 border-gray-300 border rounded-md"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
            >
              Add
            </button>
          </div>
          <ul>
            {selectedIngredients.map((ingredient) => (
              <li
                key={ingredient.goodsId}
                className="flex justify-between mb-2"
              >
                <span>
                  {ingredients.find((i) => i.id === ingredient.goodsId)?.name}
                </span>
                <span>{ingredient.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDishModal;
