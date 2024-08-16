import { Category, Product } from "./src/models/index.js";
import mongoose from "mongoose";
import "dotenv/config.js";
import { categories, products } from "./SeedData.js";

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Insert categories
    const categoryDocs = await Category.insertMany(categories);

    // Create a map of category names to category IDs
    const categoryMap = categoryDocs.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    // Map products to include category IDs instead of category names
    const productsWithCategoryIds = products.map((product) => {
      const categoryId = categoryMap[product.category];
      
      // Ensure the category is found
      if (!categoryId) {
        throw new Error(`Category '${product.category}' not found for product '${product.name}'`);
      }

      return {
        ...product,
        category: categoryId,  // Assign category ID
      };
    });

    // Insert products with associated category IDs
    await Product.insertMany(productsWithCategoryIds);

    console.log("Database seeded successfully ✔");
  } catch (error) {
    console.error("Seeding database error....", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
