import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from "../services/category.service";
export class CategoryController {
  //DI
  constructor(readonly categoryService: CategoryService) {}
  private handleError(error: any, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }

  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => this.handleError(error, res));
  };
  getCategories = async (req: Request, res: Response) => {
    const { page = "1", limit = "10" } = req.query;
    const [error, paginationDto] = PaginationDto.create(
      Number(page),
      Number(limit)
    );
    if (error) return res.status(400).json({ error });

    this.categoryService
      .getCategories(paginationDto!)
      .then((categories) => res.status(200).json(categories))
      .catch((error) => this.handleError(error, res));
  };
}
