import { Router } from "express";
import { SupplierAuthController } from "../controllers/supplierauth";

const router = Router();
const controller = new SupplierAuthController();

router.post("/login", (req, res, next) =>
  controller.login(req, res, next)
);

export default router;
