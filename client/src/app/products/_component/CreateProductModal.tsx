import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";
import { useFormValidation } from "@/app/utils/useFormValidation";
import { productValidationSchema } from "./_productValidation/productValidation";

type ProductFormData = {
  productId: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const initialFormState: ProductFormData = {
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  };

  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  } = useFormValidation(initialFormState, productValidationSchema);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validateForm()) {
        onCreate(formData);
        onClose();
        resetForm();
      }
    },
    [formData, onCreate, onClose, validateForm, resetForm]
  );

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";
  const errorCssStyles = "text-red-500 text-xs mb-2";
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.name}
            className={`${inputCssStyles} ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className={errorCssStyles}>{errors.name}</p>}

          {/* PRICE */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.price}
            className={`${inputCssStyles} ${
              errors.price ? "border-red-500" : ""
            }`}
          />
          {errors.price && <p className={errorCssStyles}>{errors.price}</p>}

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.stockQuantity}
            className={`${inputCssStyles} ${
              errors.stockQuantity ? "border-red-500" : ""
            }`}
          />
          {errors.stockQuantity && (
            <p className={errorCssStyles}>{errors.stockQuantity}</p>
          )}

          {/* RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            placeholder="Rating"
            step="0.1"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.rating}
            className={`${inputCssStyles} ${
              errors.rating ? "border-red-500" : ""
            }`}
          />
          {errors.rating && <p className={errorCssStyles}>{errors.rating}</p>}
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

export default React.memo(CreateProductModal);
