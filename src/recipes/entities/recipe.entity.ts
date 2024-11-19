import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';

export class RecipeEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  ingredients?: Ingredient[];
}
