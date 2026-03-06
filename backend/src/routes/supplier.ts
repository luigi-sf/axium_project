import { Router } from "express"
import { SupplierController } from "../controllers/supplier"
import { authMiddleware } from "../middlewares/auth"
import { authorize } from "../middlewares/authorize"
import { enum_Users_role } from "../../generated/prisma"

const router = Router()
const controller = new SupplierController()

router.use(authMiddleware)


router.post("/", controller.create.bind(controller))

router.get("/", controller.list.bind(controller))

router.get(
  "/:id",
  controller.getById.bind(controller)
)

router.put(
  "/edit/:id",
  controller.update.bind(controller)
)

router.delete(
  "/:id",
  authorize([enum_Users_role.ADMIN, enum_Users_role.SUPPLIER]),
  controller.remove.bind(controller)
)

export default router