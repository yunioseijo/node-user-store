import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductService } from "../services";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productService = new ProductService();
    const controller = new ProductController(productService);

    // Definir las rutas
    router.get("/", controller.getProducts);
    router.get("/:id");
    router.post("/", [AuthMiddleware.validateJWT], controller.createProduct);
    router.put("/:id");
    router.delete("/:id");

    return router;
  }
}
