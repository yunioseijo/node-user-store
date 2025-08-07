import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {
  //DI
  constructor(
    // La inyección de dependencia la hago en routes cuando creo el controlador
    public readonly authService: AuthService
  ) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.json(user));
  };
  loginUser = (req: Request, res: Response) => {
    res.json("LoginUser");
  };
  validateEmail = (req: Request, res: Response) => {
    res.json("validateEmail");
  };
}
