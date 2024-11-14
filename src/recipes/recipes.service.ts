import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RecipeEntity } from './entities/recipe.entity';
import { Recipe } from '@prisma/client';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}
  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe | null> {
    const createdRecipe = await this.prisma.recipe.create({
      data: createRecipeDto,
    });

    return createdRecipe;
  }

  async findAll(): Promise<Recipe[] | []> {
    const recipes = await this.prisma.recipe.findMany({
      include: {
        ingredients: {
          select: {
            ingredientId: true,
            ingredient: {
              select: {
                name: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });

    if (!recipes) {
      return [];
    }

    return recipes;
  }

  async findOne(id: string): Promise<Recipe | null> {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id,
      },
    });

    if (!recipe) {
      return null;
    }

    return recipe;
  }

  async update(
    id: string,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<RecipeEntity | null> {
    const recipe = await this.findOne(id);

    if (!recipe) {
      return null;
    }
    // generate updatedAt timestamp
    updateRecipeDto.updatedAt = new Date();

    return this.prisma.recipe.update({
      where: {
        id,
      },
      data: updateRecipeDto,
    });
  }

  async remove(id: string): Promise<RecipeEntity | null> {
    const recipe = await this.findOne(id);

    if (!recipe) {
      return null;
    }

    return this.prisma.recipe.delete({
      where: {
        id,
      },
    });
  }
}
