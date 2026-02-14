import { Router } from "express";
import { UserController } from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const controller = new UserController();

router.post('/', (req, res) => controller.create(req, res));
router.get('/', (req, res) => controller.list(req, res));

router.use(authMiddleware);

router.get('/:id', (req, res) => controller.getById(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.remove(req, res));

export default router;
