import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRecipeDto } from './create-recipe.dto';

export class UpdateRecipeIngredientsDto extends PartialType(CreateRecipeDto) {
  @ApiProperty({
    description: 'IDs des ingrédients à ajouter',
  })
  addIngredientIds?: string[];
  @ApiProperty({
    description: 'IDs des ingrédients à supprimer',
  })
  removeIngredientIds?: string[];
}
