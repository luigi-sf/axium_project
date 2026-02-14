import React from "react";
import { ProductContext } from "../../contexts/product";
import type { ProductContextData } from "../../types/products/products_context";

export const useProduct = (): ProductContextData => {
  const context = React.useContext(ProductContext);
  if (!context) throw new Error("useProduct must be used within a ProductProvider");
  return context;
};
