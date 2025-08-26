import { CategoryModel, MongoDatabase, ProductModel, UserModel } from "..";
import { envs } from "../../config";
import { seedData } from "./data";

(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });
  await seed();

  await MongoDatabase.disconnect();
})();

const randomBetween0AndX = (x: number) => Math.floor(Math.random() * x);

async function seed() {
  // 0. Delete existing data
  await Promise.all([
    UserModel.deleteMany({}),
    CategoryModel.deleteMany({}),
    ProductModel.deleteMany({}),
  ]);
  // 1. Create users
  const users = await UserModel.insertMany(seedData.users);

  // 2. Create Categories
  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => ({
      ...category,
      user: users[randomBetween0AndX(users.length - 1)]._id,
    }))
  );

  // 3. Create Products
  const products = await ProductModel.insertMany(
    seedData.products.map((product) => ({
      ...product,
      user: users[randomBetween0AndX(users.length - 1)]._id,
      category: categories[randomBetween0AndX(categories.length - 1)]._id,
    }))
  );

  console.log("Data seeded successfully");
}
