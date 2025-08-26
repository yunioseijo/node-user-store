import { ProductModel } from "../../data";
import {
  CreateProductDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from "../../domain";

export class ProductService {
  constructor() {}

  async createProduct(createProductDto: CreateProductDto) {
    const productExist = await ProductModel.findOne({
      name: createProductDto.name,
    });
    if (productExist) throw CustomError.badRequest("Product already exists");
    try {
      const product = new ProductModel({
        ...createProductDto,
      });
      await product.save();
      return product;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
        //Todo: Populate
      ]);
      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/products?page=${page + 1}&limit=${limit}`,
        prev: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products: products,
      };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
