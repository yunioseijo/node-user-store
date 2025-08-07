import { AuthService } from "../services/auth.service";
import { AuthController } from "./controller";
import { Router } from "express";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authService = new AuthService();
    const controller = new AuthController(authService);

    // Definir las rutas
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get("/validate-email/:token", controller.validateEmail);

    return router;
  }
}
