import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new CategoryController();

    // Definir las rutas
    router.get("/", controller.getCategories);
    router.get("/:id");
    router.post("/", [AuthMiddleware.validateJWT], controller.createCategory);
    router.put("/:id");
    router.delete("/:id");

    return router;
  }
}
