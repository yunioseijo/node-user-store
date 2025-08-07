import { Request, Response } from "express";

export class AuthController {
  //DI
  constructor() {}

  registerUser = (req: Request, res: Response) => {
    res.json("RegisterUser");
  };
  loginUser = (req: Request, res: Response) => {
    res.json("LoginUser");
  };
  validateEmail = (req: Request, res: Response) => {
    res.json("validateEmail");
  };
}
