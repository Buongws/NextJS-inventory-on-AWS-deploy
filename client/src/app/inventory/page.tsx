"use client";

import { useState } from "react";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useGetProductsQuery } from "../state";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  // State cho pagination
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0, // MUI DataGrid sử dụng zero-based index cho page
    pageSize: 10,
  });

  // Truy vấn với pagination
  const { data, isError, isLoading } = useGetProductsQuery({
    page: paginationModel.page + 1, // Chuyển đổi từ zero-based sang one-based
    limit: paginationModel.pageSize,
  });

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={data.products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        paginationMode="server"
        rowCount={data.pagination.totalCount}
      />
    </div>
  );
};

export default Inventory;
