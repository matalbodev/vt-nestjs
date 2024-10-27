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
