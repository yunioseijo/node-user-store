import { CategoryModel } from "../../data";
import { CustomError, PaginationDto, UserEntity } from "../../domain";
import { CreateCategoryDto } from "../../domain/dtos/category/create-category.dto";

export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExist = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (categoryExist) throw CustomError.badRequest("Category already exists");
    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });
      await category.save();
      return {
        id: category._id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      // const total = await CategoryModel.countDocuments();
      // const categories = await CategoryModel.find()
      //   .skip((page - 1) * limit)
      //   .limit(limit);
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/categories?page=${page + 1}&limit=${limit}`,
        prev:
          page > 1 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
        categories: categories.map((category) => ({
          id: category._id,
          name: category.name,
          available: category.available,
        })),
      };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
