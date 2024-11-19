import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateIngredientDto } from './create-ingredient.dto';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
}
