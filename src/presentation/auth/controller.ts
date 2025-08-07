import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {
  //DI
  constructor(
    // La inyección de dependencia la hago en routes cuando creo el controlador
    public readonly authService: AuthService
  ) {}

  private handleError(error: any, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };
  loginUser = (req: Request, res: Response) => {
    res.json("LoginUser");
  };
  validateEmail = (req: Request, res: Response) => {
    res.json("validateEmail");
  };
}
