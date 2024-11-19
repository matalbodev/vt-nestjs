import { ApiProperty } from "@nestjs/swagger";
import { Recipe } from "@prisma/client";

export class Ingredient {
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
    recipes?: Recipe[];
}
