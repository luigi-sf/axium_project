import { createContext, useContext } from "react";
import type { ProductContextData } from "../types/products/products_context";

export const ProductContext = createContext<ProductContextData | undefined>(undefined);

export const useSuppliers = (): ProductContextData => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a SupplierProvider");
  }
  return context;
};
