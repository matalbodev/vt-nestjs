import { Recipe } from '@prisma/client';
import { IngredientEntity } from 'src/ingredients/entities/ingredient.entity';

export class RecipeEntity implements Recipe {
  id: string;
  title: string;
  description: string;
  ingredients?: IngredientEntity[];
  createdAt: Date;
  updatedAt: Date;
}
