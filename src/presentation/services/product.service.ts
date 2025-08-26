import { PaginationDto } from "../../domain";

export class ProductService {
  constructor() {}

  //   async createProduct(createProductDto: CreateProductDto, user: UserEntity) {
  // const productExist = await ProductModel.findOne({
  //   name: createProductDto.name,
  // });
  // if (productExist) throw CustomError.badRequest("Product already exists");
  // try {
  //   const category = new ProductModel({
  //     ...createProductDto,
  //     user: user.id,
  //   });
  //   await category.save();
  //   return {
  //     id: category._id,
  //     name: category.name,
  //     available: category.available,
  //   };
  // } catch (error) {
  //   throw CustomError.internalServer(`${error}`);
  // }
  //   }

  async getProducts(paginationDto: PaginationDto) {
    //     const { page, limit } = paginationDto;
    //     try {
    //       // const total = await ProductModel.countDocuments();
    //       // const categories = await ProductModel.find()
    //       //   .skip((page - 1) * limit)
    //       //   .limit(limit);
    //       const [total, categories] = await Promise.all([
    //         ProductModel.countDocuments(),
    //         ProductModel.find()
    //           .skip((page - 1) * limit)
    //           .limit(limit),
    //       ]);
    //       return {
    //         page: page,
    //         limit: limit,
    //         total: total,
    //         next: `/api/categories?page=${page + 1}&limit=${limit}`,
    //         prev:
    //           page > 1 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
    //         categories: categories.map((category) => ({
    //           id: category._id,
    //           name: category.name,
    //           available: category.available,
    //         })),
    //       };
    //     } catch (error) {
    //       throw CustomError.internalServer();
    //     }
  }
}
