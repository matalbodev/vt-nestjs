import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  updatedAt: Date;
}
