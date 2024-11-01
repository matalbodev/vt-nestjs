import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}
  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe | null> {
    return this.prisma.recipe.create({
      data: createRecipeDto,
    });
  }

  async findAll(): Promise<Recipe[] | []> {
    return this.prisma.recipe.findMany();
  }

  async findOne(id: string): Promise<Recipe | null> {
    return this.prisma.recipe.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  async remove(id: string) {
    return `This action removes a #${id} recipe`;
  }
}
