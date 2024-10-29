import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // generate 10 recipes
  for (let i = 0; i < 10; i++) {
    await prisma.recipe.create({
      data: {
        title: `Recipe ${i}`,
        description: `Description ${i}`,
      },
    });
  }

  // generate 10 ingredients
  for (let i = 0; i < 10; i++) {
    await prisma.ingredient.create({
      data: {
        name: `Ingredient ${i}`,
      },
    });
  }

  // add ingredients to recipes
  const recipes = await prisma.recipe.findMany();
  const ingredients = await prisma.ingredient.findMany();

  // select 5 random ingredients for each recipe
  for (const recipe of recipes) {
    // random ingredients
    const randomIngredients = ingredients
      .sort(() => Math.random() - Math.random())
      .slice(0, 5);
    // create ingredientsOnRecipe
    const ingredientsOnRecipe = [];
    for (const ingredient of randomIngredients) {
      const ingredientOnRecipe = await prisma.ingredientsOnRecipe.create({
        data: {
          ingredientId: ingredient.id,
          recipeId: recipe.id,
        },
      });
      ingredientsOnRecipe.push(ingredientOnRecipe);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
