import { Router } from "express";
import { UserController } from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize"
import { enum_Users_role } from "../../generated/prisma";

const router = Router();
const controller = new UserController();

router.post('/',controller.create.bind(controller));
router.get('/', controller.list.bind(controller));

router.use(authMiddleware);

router.get('/:id',authorize([enum_Users_role.ADMIN]), controller.getById.bind(controller))
router.put('/:id',authorize([enum_Users_role.ADMIN]), controller.update.bind(controller));
router.delete('/:id',authorize([enum_Users_role.ADMIN]),controller.remove.bind(controller));

export default router;
