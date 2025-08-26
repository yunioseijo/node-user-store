import { Validators } from "../../../config";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly description: string,
    public readonly price: number,
    public readonly category: string,
    public readonly user: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, description, price, category, user } = props;
    if (!name) return ["Missing name"];

    if (!user) return ["Missing user"];
    if (!Validators.isMongoId(user)) return ["Invalid user id"];

    if (!category) return ["Missing category"];
    if (!Validators.isMongoId(category)) return ["Invalid category id"];

    return [
      undefined,
      new CreateProductDto(
        name,
        !!available,
        description,
        price,
        category,
        user
      ),
    ];
  }
}
