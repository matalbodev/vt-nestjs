import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  ingredients: string[]; //id des ingrédients
}
