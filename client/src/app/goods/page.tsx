"use client";

import { useState } from "react";
import {
  useCreateGoodsMutation,
  useDeleteGoodsMutation,
  useGetGoodsQuery,
  useUpdateGoodsMutation,
} from "@/state/api";
import {
  PlusCircleIcon,
  SearchIcon,
  CheckIcon,
  TrashIcon,
  EditIcon,
} from "lucide-react";
import Header from "@/app/(components)/Header";
import CreateGoodsModal from "./CreateGoodsModal";
import EditGoodsModal from "./EditGoodsModal";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import confirmAlert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css của confirmAlert

type goodsFormData = {
  id: number;
  quantity: number;
  name: string;
  type: string;
  averageImportPrice: number;
  weight: number;
  unit: string;
  sellingPrice: number;
};

const Goods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGoods, setSelectedGoods] = useState<goodsFormData[]>([]);
  const [editGoodsData, setEditGoodsData] = useState<goodsFormData | null>(
    null
  );

  const { data: goods, isLoading, isError } = useGetGoodsQuery(searchTerm);
  const [createGoods] = useCreateGoodsMutation();
  const [updateGoods] = useUpdateGoodsMutation();
  const [deleteGoods] = useDeleteGoodsMutation();

  const handleCreateGoods = async (goodsData: goodsFormData) => {
    try {
      await createGoods(goodsData);
      toast.success("Goods created successfully!");
    } catch (error) {
      toast.error("Failed to create goods!");
    }
  };

  const handleEditGoods = async (goodsData: goodsFormData) => {
    try {
      await updateGoods({ id: goodsData.id, updatedGoods: goodsData });
      toast.success("Goods updated successfully!");
    } catch (error) {
      toast.error("Failed to update goods!");
    }
  };

  const handleDeleteGoods = async () => {
    if (selectedGoods.length > 0) {
      confirmAlert({
        title: "Confirm Deletion",
        message: "Are you sure you want to delete the selected goods?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              try {
                const idsToDelete = selectedGoods.map((good) => good.id);
                await Promise.all(idsToDelete.map((id) => deleteGoods(id)));
                toast.success("Goods deleted successfully!");
                setSelectedGoods([]);
              } catch (error) {
                toast.error("Failed to delete goods!");
              }
            },
          },
          {
            label: "No",
            onClick: () => {
              // Do nothing
            },
          },
        ],
      });
    }
  };

  const handleGoodsClick = (good: goodsFormData) => {
    if (selectedGoods.some((selected) => selected.id === good.id)) {
      setSelectedGoods(
        selectedGoods.filter((selected) => selected.id !== good.id)
      );
    } else {
      setSelectedGoods([...selectedGoods, good]);
    }
  };

  const openEditModal = () => {
    if (selectedGoods.length === 1) {
      setEditGoodsData(selectedGoods[0]);
      setIsEditModalOpen(true);
    }
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !goods) {
    return (
      <div className="text-center text-red-500 py-4">Failed to load goods</div>
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
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Goods" />
        {selectedGoods.length === 1 ? (
          <div className="flex gap-4">
            <button
              className="flex items-center bg-yellow-500 hover:bg-yellow-700 text-gray-100 font-bold py-2 px-4 rounded"
              onClick={openEditModal}
            >
              <EditIcon className="w-5 h-5 mr-2 !text-gray-100" /> Edit Goods
            </button>
            <button
              className="flex items-center bg-red-500 hover:bg-red-700 text-gray-100 font-bold py-2 px-4 rounded"
              onClick={handleDeleteGoods}
            >
              <TrashIcon className="w-5 h-5 mr-2 !text-gray-100" /> Delete Goods
            </button>
          </div>
        ) : selectedGoods.length > 1 ? (
          <button
            className="flex items-center bg-red-500 hover:bg-red-700 text-gray-100 font-bold py-2 px-4 rounded"
            onClick={handleDeleteGoods}
          >
            <TrashIcon className="w-5 h-5 mr-2 !text-gray-100" /> Delete
            Selected Goods
          </button>
        ) : (
          <button
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-100" /> Add Goods
          </button>
        )}
      </div>

      {/* BODY GOODS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          goods?.map((good) => (
            <div
              key={good.id}
              className={`border shadow rounded-md p-4 max-w-full w-full mx-auto cursor-pointer relative ${
                selectedGoods.some((selected) => selected.id === good.id)
                  ? "border-blue-500"
                  : "border-gray-200"
              }`}
              onClick={() => handleGoodsClick(good)}
            >
              {/* Nút biểu thị đã chọn */}
              {selectedGoods.some((selected) => selected.id === good.id) && (
                <CheckIcon className="absolute top-2 right-2 text-green-500 w-6 h-6" />
              )}
              <div className="flex flex-col items-center">
                <Image
                  src=""
                  alt={good.name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36"
                />
                <h3 className="text-lg text-gray-900 font-semibold">
                  {good.name}
                </h3>
                <p className="text-gray-800">${good.sellingPrice.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {good.quantity}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE GOODS MODAL */}
      <CreateGoodsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateGoods}
      />

      {/* EDIT GOODS MODAL */}
      {editGoodsData && (
        <EditGoodsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditGoods}
          goods={editGoodsData}
        />
      )}

      {/* TOAST NOTIFICATION */}
      <ToastContainer />
    </div>
  );
};

export default Goods;
