"use client";

import { useGetGoodsQuery } from "@/state/api";
import Header from "../(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import { CSVImporter } from "csv-import-react";
import { useState } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Tên nhà cung cấp", width: 200 },
  { field: "address", headerName: "Địa chỉ", width: 50 },
  { field: "contactInfo", headerName: "Thông tin liên lạc", width: 90 },
];

const Providers = () => {
  const { data: goods, isError, isLoading } = useGetGoodsQuery();

  const [isOpen, setIsOpen] = useState(false);
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
      <div className="flex justify-between items-center mb-4">
        <Header name="Kho hàng" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded"
          onClick={() => {}}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-100" /> Thêm nhà cung cấp
        </button>
      </div>
      <DataGrid
        rows={goods}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        className="shadow rounded-lg border border-gray-200 mt-5 text-gray-900"
      ></DataGrid>
    </div>
  );
};

export default Providers;
