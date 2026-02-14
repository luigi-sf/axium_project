import { createContext, useContext } from "react";
import type { SupplierContextData } from "../types/suppliers/supplier_context";

export const SupplierContext = createContext<SupplierContextData | undefined>(undefined);

export const useSuppliers = (): SupplierContextData => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error("useSuppliers must be used within a SupplierProvider");
  }
  return context;
};
