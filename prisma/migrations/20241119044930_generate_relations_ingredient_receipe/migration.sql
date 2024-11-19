/*
  Warnings:

  - You are about to drop the `_IngredientToRecipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_B_fkey";

-- DropTable
DROP TABLE "_IngredientToRecipe";

-- CreateTable
CREATE TABLE "_RecipeToIngredient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToIngredient_AB_unique" ON "_RecipeToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToIngredient_B_index" ON "_RecipeToIngredient"("B");

-- AddForeignKey
ALTER TABLE "_RecipeToIngredient" ADD CONSTRAINT "_RecipeToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToIngredient" ADD CONSTRAINT "_RecipeToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
