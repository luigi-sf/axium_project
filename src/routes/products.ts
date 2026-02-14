import { Router } from "express";
import { ProductService } from "../services/product";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const productService = new ProductService();

router.use(authMiddleware);

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productService.getById(id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
});

// CREATE
router.post("/", async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const { name, description, price } = req.body;

    const product = await productService.create({
      name,
      description,
      price,
      userId: req.userId, // ✅ agora é string garantido
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await productService.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await productService.delete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
