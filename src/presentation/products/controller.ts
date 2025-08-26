import { Request, Response } from "express";
import { CustomError, PaginationDto } from "../../domain";
import { ProductService } from "../services";
export class ProductController {
  //DI
  constructor(readonly productService: ProductService) {}
  private handleError(error: any, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }

  createProduct = (req: Request, res: Response) => {
    // const [error, createProductDto] = CreateProductDto.create(req.body);
    // if (error) return res.status(400).json({ error });
    // this.productService
    //   .createProduct(createProductDto!, req.body.user)
    //   .then((product) => res.status(201).json(product))
    //   .catch((error) => this.handleError(error, res));
    res.json("Create Product");
  };
  getProducts = async (req: Request, res: Response) => {
    const { page = "1", limit = "10" } = req.query;
    const [error, paginationDto] = PaginationDto.create(
      Number(page),
      Number(limit)
    );
    if (error) return res.status(400).json({ error });
    return res.json("Get Products");

    // this.productService
    //   .getProducts(paginationDto!)
    //   .then((categories) => res.status(200).json(categories))
    //   .catch((error) => this.handleError(error, res));
  };
}
