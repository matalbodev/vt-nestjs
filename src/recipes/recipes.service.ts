import { Injectable } from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeIngredientsDto } from './dto/update-recipe-ingredients.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeEntity } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe | null> {
    const ingredientsLinks = createRecipeDto.ingredients.map((id) => ({ id }));
    delete createRecipeDto.ingredients;
    const createdRecipe = await this.prisma.recipe.create({
      data: {
        ...createRecipeDto,
        ingredients: {
          connect: ingredientsLinks,
        },
      },
    });

    return createdRecipe;
  }

  async findAll(): Promise<Recipe[] | []> {
    const recipes = await this.prisma.recipe.findMany();

    if (!recipes) {
      return [];
    }

    return recipes;
  }

  async findOne(id: string): Promise<RecipeEntity | null> {
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

  async getRecipeWithIngredients(id: string): Promise<RecipeEntity | null> {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id,
      },
      include: { ingredients: true },
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
    const recipe = await (updateRecipeDto.ingredients?.length
      ? this.getRecipeWithIngredients(id)
      : this.findOne(id));

    if (!recipe) {
      return null;
    }

    const existingIngredients = recipe?.ingredients;
    const ingredientToDelete = existingIngredients.filter(
      (ingredient) => !updateRecipeDto.ingredients?.includes(ingredient.id),
    );

    const ingredientMapToAdd = updateRecipeDto.ingredients.map((id) => ({
      id,
    }));

    const ingredientMapToDelete = ingredientToDelete?.map((ingredient) => ({
      id: ingredient.id,
    }));
    delete updateRecipeDto.ingredients;
    return this.prisma.recipe.update({
      where: {
        id,
      },
      data: {
        ...updateRecipeDto,
        updatedAt: new Date(),
        ingredients: {
          connect: ingredientMapToAdd || [],
          disconnect: ingredientMapToDelete || [],
        },
      },
      include: { ingredients: true },
    });
  }

  async remove(id: string): Promise<Recipe | null> {
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

  async updateRecipeIngredients(
    recipeId: string,
    updateRecipeDto: UpdateRecipeIngredientsDto,
  ): Promise<RecipeEntity> {
    const { addIngredientIds, removeIngredientIds } = updateRecipeDto;
    const existingIngredients = await this.prisma.ingredient.findMany({
      where: { id: { in: [...addIngredientIds, ...removeIngredientIds] } },
    });

    if (
      existingIngredients.length !==
      addIngredientIds.length + removeIngredientIds.length
    ) {
      return null;
    }

    return this.prisma.recipe.update({
      where: { id: recipeId },
      data: {
        ingredients: {
          connect: addIngredientIds?.map((id) => ({ id })) || [],
          disconnect: removeIngredientIds?.map((id) => ({ id })) || [],
        },
      },
      include: { ingredients: true }, // Inclure les ingrédients
    });
  }
}
