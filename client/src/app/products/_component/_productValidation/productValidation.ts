export type ProductFormData = {
  productId?: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

export type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

export const productValidationSchema = {
  name: (value: string) => {
    if (!value.trim()) return "Product name is required";
    if (value.length < 3) return "Product name must be at least 3 characters";
    if (value.length > 50)
      return "Product name must be less than 50 characters";
    return null;
  },
  price: (value: number) => {
    if (value <= 0) return "Price must be greater than zero";
    if (value > 1000000) return "Price is too high";
    return null;
  },
  stockQuantity: (value: number) => {
    if (value < 0) return "Stock quantity cannot be negative";
    if (!Number.isInteger(value))
      return "Stock quantity must be a whole number";
    return null;
  },
  rating: (value: number) => {
    if (value < 0) return "Rating cannot be negative";
    if (value > 5) return "Rating must be between 0 and 5";
    return null;
  },
};
