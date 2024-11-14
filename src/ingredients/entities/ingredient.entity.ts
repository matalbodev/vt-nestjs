import { Ingredient } from '@prisma/client';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';

export class IngredientEntity implements Ingredient {
  id: string;
  name: string;
  description: string;
  recipes?: RecipeEntity[];
  createdAt: Date;
  updatedAt: Date;
}
