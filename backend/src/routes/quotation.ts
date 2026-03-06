import { Router } from "express"
import { ProductController } from "../controllers/product"
import { authMiddleware } from "../middlewares/auth"
import { authorize } from "../middlewares/authorize"
import { enum_Users_role } from "../../generated/prisma"

const router = Router()
const controller = new ProductController()

router.use(authMiddleware)


router.post("/", controller.create.bind(controller))

// 🔹 LISTAR TODOS (qualquer autenticado)
router.get("/", controller.list.bind(controller))


// 🔹 ATUALIZAR (ADMIN ou SUPPLIER)
router.put(
  "/:id/edit",
  controller.update.bind(controller)
)


// 🔹 PEGAR POR ID (somente ADMIN)
router.get(
  "/:id",
  controller.getById.bind(controller)
)


// 🔹 DELETAR (somente ADMIN)
router.delete(
  "/:id",
  controller.remove.bind(controller)
)

export default router