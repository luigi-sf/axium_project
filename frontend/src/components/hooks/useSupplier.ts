
import React from "react";
import { SupplierContext } from "../../contexts/supplierContext";
import type { SupplierContextData } from "../../types/suppliers/supplier_context";

export const useSuppliers = (): SupplierContextData => {
  const context = React.useContext(SupplierContext);
  if (!context) throw new Error("useSuppliers must be used within a SupplierProvider");
  return context;
};
