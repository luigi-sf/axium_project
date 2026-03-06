import { Router } from "express";
import { ProductController } from "../controllers/product";
import { authMiddleware } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import { enum_Users_role } from "../../generated/prisma";


const router = Router();
const controller = new ProductController();

router.use(authMiddleware);

// 🔹 listar todos
router.post("/", controller.create.bind(controller));

router.get("/", controller.list.bind(controller));


router.put(
  "/edit/:id",
  controller.update.bind(controller)
);

// 🔹 pegar por id (apenas ADMIN)
router.get(
  "/:id",
  authorize([enum_Users_role.ADMIN]),
  controller.getById.bind(controller)
);


router.delete(
  "/:id",
 authorize([enum_Users_role.ADMIN]),
  controller.remove.bind(controller)
);

export default router;