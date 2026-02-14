import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import supplierRoutes from "./routes/supplier";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import supplierAuthRoutes from "./routes/supplier_auth";
import productRoutes from "./routes/products";        // 👈 adicionar
import quotationRoutes from "./routes/quotation";    // 👈 adicionar

import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/requestLogger";
import { setupSwagger } from "./config/swagger";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

setupSwagger(app, port);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Gestão de Fornecedores e Cotações API" });
});

/* ================= ROTAS ================= */

app.use("/api/v1/supplier/auth", supplierAuthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/suppliers", supplierRoutes);

app.use("/api/v1/products", productRoutes);        // 👈 adicionar
app.use("/api/v1/quotations", quotationRoutes);    // 👈 adicionar

/* ========================================= */

app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server running: http://localhost:${port}`);
  console.log(`📘 Swagger: http://localhost:${port}/api-docs`);
});
