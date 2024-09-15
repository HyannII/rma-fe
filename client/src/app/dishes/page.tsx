"use client";

import { useCreateDishMutation, useGetDishesQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import CreateDishModal from "./CreateDishModal";
import Image from "next/image";

type DishFormData = {
  name: string;
  type: string;
  unit: string;
  price: number;
  ingredients: { goodsId: number; quantity: number }[]; // For multiple ingredients
};

const Dish = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: dishes, isLoading, isError } = useGetDishesQuery(searchTerm);

  const [createDish] = useCreateDishMutation();
  const handleCreateDish = async (dishData: DishFormData) => {
      await createDish(dishData)
  };

  if (isLoading) {
    return <div className="py-4">Đang tải...</div>;
  }

  if (isError || !dishes) {
    return (
      <div className="text-center text-red-500 py-4">
        Lấy danh sách món ăn không thành công
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Món ăn" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-100" /> Thêm món ăn
        </button>
      </div>

      {/* BODY dish LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Đang tải...</div>
        ) : (
          dishes?.map((dish) => (
            <div
              key={dish.id}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                <Image
                  src=""
                  alt={dish.name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36"
                />
                <h3 className="text-lg text-gray-900 font-semibold">
                  {dish.name}
                </h3>
                <p className="text-gray-800">${dish.price}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Loại món: {dish.type}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateDishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateDish} // Pass the updated handler
      />
    </div>
  );
};

export default Dish;
