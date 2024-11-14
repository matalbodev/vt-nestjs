import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  title: string;
  description: string;
  updatedAt: Date;
}
