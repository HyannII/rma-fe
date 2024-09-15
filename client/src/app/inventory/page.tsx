"use client"

import React, { useState } from "react";
import {
  useCreateGoodsMutation,
  useDeleteGoodsMutation,
  useGetGoodsQuery,
  useUpdateGoodsMutation,
} from "@/state/api";
import Header from "../(components)/Header";
import {
  DataGridPro,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid-pro";
import {
  ArrowBigRight,
  FileInput,
  PlusCircleIcon,
  SearchIcon,
  Edit2,
  Trash2,
} from "lucide-react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import CreateGoodsModal from "./CreateGoodsModal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

const CSVImporter = dynamic(
  () => import("csv-import-react").then((mod) => mod.CSVImporter),
  {
    ssr: false,
  }
);

type Goods = {
  id: number;
  quantity: number;
  name: string;
  type: string;
  averageImportPrice: number;
  weight: number;
  unit: string;
  sellingPrice: number;
};

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editGoodsData, setEditGoodsData] = useState<Goods | null>(null);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const {
    data: goods,
    isError,
    isLoading,
    refetch,
  } = useGetGoodsQuery(searchTerm);
  const [createGoods] = useCreateGoodsMutation();
  const [updateGoods] = useUpdateGoodsMutation();
  const [deleteGoods] = useDeleteGoodsMutation();
  const [isCSVOpen, setIsCSVOpen] = useState(false);
  const [dataKey, setDataKey] = useState(0);

  const handleCreateGoods = async (goodsData: Goods) => {
    try {
      await createGoods(goodsData);
      toast.success("Goods created successfully!");
    } catch (error) {
      toast.error("Failed to create goods!");
    }
  };

  const handleDeleteGoods = async (id: number) => {
    try {
      await deleteGoods(id);
      toast.success("Goods deleted successfully!");
      refetch(); // Refetch goods to update the grid
      setDataKey((prevKey) => prevKey + 1);
    } catch (error) {
      toast.error("Failed to delete goods!");
    }
  };

  const handleDeleteSelected = async () => {
    try {
      for (const id of selectedRows) {
        await deleteGoods(id);
      }
      toast.success("Selected goods deleted successfully!");
      refetch(); // Refetch goods to update the grid
      setSelectedRows([]); // Clear selection
    } catch (error) {
      toast.error("Failed to delete selected goods!");
    }
  };

  const confirmDelete = (id: number) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this goods?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteGoods(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const customTranslations = {
    vi: {
      Upload: "Tải lên",
      "Select Header": "Chọn hàng tiêu đề",
      "Map Columns": "Chọn cột nội dung",
      "Expected Column": "Cột cần nhập",
      Required: "Bắt buộc",
      "Drop your file here": "Kéo thả file vào đây",
      or: "hoặc",
      "Browse files": "Tải lên từ thiết bị",
      "Download Template": "Tải về bản mẫu",
      "Select Header Row": "Chọn hàng tiêu đề",
      "Select the row which contains the column headers":
        "Chọn hàng có chứa tiêu đề cho các cột",
      "Your File Column": "Các cột",
      "Your Sample Data": "Dữ liệu trong cột",
      "Destination Column": "Cột tương ứng",
      Include: "Bao gồm",
      Cancel: "Huỷ",
      Continue: "Tiếp tục",
      Back: "Quay lại",
      Submit: "Xác nhận",
    },
  };

  const HeaderCell = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  });

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Tên mặt hàng",
      minWidth: 200,
      editable: true,
      flex: 3,
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      minWidth: 80,
      type: "number",
      editable: true,
      flex: 2,
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
      valueGetter: (value, row) => `${row.quantity}`,
    },
    {
      field: "unit",
      headerName: "Đơn vị tính",
      minWidth: 100,
      flex: 2,
      headerAlign: "center",
      editable: true,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "type",
      headerName: "Danh mục",
      minWidth: 90,
      flex: 2,
      headerAlign: "center",
      editable: true,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "averageImportPrice",
      headerName: "Giá nhập trung bình",
      minWidth: 180,
      type: "number",
      flex: 2,
      headerAlign: "center",
      editable: true,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
      valueGetter: (value, row) => `${row.averageImportPrice} VND`,
    },
    {
      field: "sellingPrice",
      headerName: "Giá bán",
      minWidth: 110,
      type: "number",
      flex: 2,
      headerAlign: "center",
      editable: true,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
      valueGetter: (value, row) => `${row.sellingPrice} VND`,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Xoá",
      flex: 1,
      headerAlign: "center",
      minWidth: 50,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Trash2 />}
          label="Delete"
          onClick={() => confirmDelete(params.row.id)}
        />,
      ],
    },
  ];

  // Tạo một map từ field -> headerName để tra cứu
  const fieldToHeaderMap: Record<string, string> = columns.reduce(
    (map, column) => {
      map[column.field] = column.headerName || column.field;
      return map;
    },
    {} as Record<string, string>
  );

  // Hàm lấy message xác nhận với headerName thay vì field
  const getConfirmationMessage = (newRow: Goods, oldRow: Goods) => {
    let changes = Object.keys(newRow).filter(
      (key) => newRow[key as keyof Goods] !== oldRow[key as keyof Goods]
    );

    return changes
      .map((key) => {
        const fieldLabel = fieldToHeaderMap[key] || key; // Lấy headerName từ map hoặc để lại key
        return `Bấm "Có" để xác nhận thay đổi ${fieldLabel} từ "${
          oldRow[key as keyof Goods]
        }" thành "${newRow[key as keyof Goods]}".`;
      })
      .join("\n");
  };

  // Function to handle the row update process
  const processRowUpdate = (newRow: Goods, oldRow: Goods): Promise<Goods> => {
    return new Promise<Goods>((resolve, reject) => {
      // Get the confirmation message with specific field and value changes
      const message = getConfirmationMessage(newRow, oldRow);

      // Show a confirmation dialog
      confirmAlert({
        title: "Xác nhận chỉnh sửa",
        message: message,
        buttons: [
          {
            label: "Có",
            onClick: async () => {
              try {
                // Call API to update the goods
                await updateGoods({ id: newRow.id, updatedGoods: newRow });
                toast.success("Cập nhật thành công!");
                resolve(newRow); // Return the updated row
              } catch (error) {
                toast.error("Cập nhật thất bại!");
                reject(oldRow); // Revert to the old row if update fails
              }
            },
          },
          {
            label: "Không",
            onClick: () => {
              reject(oldRow); // Cancel the update and revert to the old row
            },
          },
        ],
      });
    });
  };

  if (isLoading) {
    return <div className="py-4">Đang tải...</div>;
  }
  if (isError || !goods) {
    return (
      <div className="text-center text-red-500 py-4">
        Lấy danh sách hàng không thành công
      </div>
    );
  }

  return (
    <div className="flex flex-col">
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
      <div className="flex justify-between items-center mb-4">
        <Header name="Kho hàng" />
        <div className="flex justify-between items-center">
          <button
            className="flex items-center bg-red-500 hover:bg-red-700 text-gray-100 font-bold py-2 px-4 mr-4 rounded"
            onClick={handleDeleteSelected}
          >
            <Trash2 className="w-5 h-5 mr-2 !text-gray-100" /> Xoá đã chọn
          </button>
          <button
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 mr-2 rounded"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-100" /> Thêm mới
          </button>
          <button
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 ml-2 rounded"
            onClick={() => setIsCSVOpen(true)}
          >
            <FileInput className="w-5 h-5 mr-2 !text-gray-100" /> Import
          </button>
        </div>
      </div>
      <DataGridPro<Goods>
        rows={goods}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(Array.from(newSelection));
        }}
        processRowUpdate={processRowUpdate}
        className="shadow rounded-lg border border-gray-200 mt-5 text-gray-900"
      />
      <CreateGoodsModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateGoods}
      />
      {isCSVOpen && (
        <CSVImporter
          modalIsOpen={isCSVOpen}
          modalOnCloseTriggered={() => setIsCSVOpen(false)}
          darkMode={false}
          language="vi"
          customTranslations={customTranslations}
          onComplete={() => {}}
          template={{
            columns: [
              {
                name: "First Name",
                key: "first_name",
                required: true,
                description: "The first name of the user",
                suggested_mappings: ["First", "Name"],
              },
              {
                name: "Age",
                data_type: "number",
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default Inventory;
