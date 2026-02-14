import { Router } from "express";
import { QuotationService } from "../services/quotation";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const quotationService = new QuotationService();

router.use(authMiddleware);

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const quotations = await quotationService.getAll();
    res.json(quotations);
  } catch (err) {
    next(err);
  }
});

// GET BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const quotation = await quotationService.getById(id);

    if (!quotation) {
      return res.status(404).json({ message: "Cotação não encontrada" });
    }

    res.json(quotation);
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

    const { supplierId, status, items } = req.body;

    const quotation = await quotationService.create({
      supplierId,
      status,
      items,
      userId: req.userId, // ✅ agora é string garantido
    });

    res.status(201).json(quotation);
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await quotationService.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await quotationService.delete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
