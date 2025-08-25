import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";
export class CategoryController {
  //DI
  constructor() {} //   public readonly categoryService: CategoryService // La inyección de dependencia la hago en routes cuando creo el controlador
  private handleError(error: any, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }

  createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });
    res.json(createCategoryDto);
    // this.categoryService
    //   .createCategory(createCategoryDto!)
    //   .then((category) => res.status(201).json(category))
    //   .catch((error) => this.handleError(error, res));
  };
  getCategories = async (req: Request, res: Response) => {
    res.json({ message: "Categories found" });
    //     this.categoryService
    //       .getCategories()
    //       .then((categories) => res.status(200).json(categories))
    //       .catch((error) => this.handleError(error, res));
  };
}
