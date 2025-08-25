import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid token format" });
    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });
      const user = await UserModel.findById(payload.id);
      //Este error no debería existir porque si hay un token firmado por mi backend el user debería existir,
      // solo en caso que se halla borrado el usuario pudiera pasar por esto
      if (!user)
        return res.status(401).json({ error: "User not found -Token" });
      //todo: validar si el usuario está activo
      req.body.user = UserEntity.fromObject(user);
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
