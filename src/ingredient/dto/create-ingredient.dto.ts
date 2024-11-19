import { ApiProperty } from "@nestjs/swagger";

export class CreateIngredientDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdAt: Date;
}
