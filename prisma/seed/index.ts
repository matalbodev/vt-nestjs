import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  // generate 10 ingredients
  for (let i = 0; i < 10; i++) {
    await prisma.ingredient.create({
      data: {
        title: `Ingredient ${i}`,
      },
    });
  }

  const ingredients = await prisma.ingredient.findMany();
   // generate 10 recipes
   for (let i = 0; i < 10; i++) {
    const randomIngredients = ingredients
    .sort(() => Math.random() - Math.random())
    .slice(0, 5)
    .map((ingredient) => ({id: ingredient.id}));
    await prisma.recipe.create({
      data: {
        title: `Recipe ${i}`,
        description: `Description ${i}`,
        ingredients: {
          connect: randomIngredients
        }
      },
    });
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