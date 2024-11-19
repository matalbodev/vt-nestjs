import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeIngredientsDto } from './dto/update-recipe-ingredients.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeEntity } from './entities/recipe.entity';
import { RecipesService } from './recipes.service';

@Controller('recipes')
@ApiTags('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new recipe',
    type: RecipeEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Recipe not created',
  })
  async create(@Res() res: Response, @Body() createRecipeDto: CreateRecipeDto) {
    const recipe = await this.recipesService.create(createRecipeDto);
    if (!recipe) {
      return res.status(400).json({ message: 'Recipe not created' });
    }
    return res.status(201).json(recipe);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all recipes',
    type: [RecipeEntity],
  })
  @ApiResponse({
    status: 404,
    description: 'No recipes found',
  })
  async findAll(@Res() res: Response) {
    const recipes = await this.recipesService.findAll();
    if (!recipes?.length) {
      return res.status(404).json({ message: 'No recipes found' });
    }
    return res.status(200).json(recipes);
  }

  @Get(':id/lazy')
  @ApiResponse({
    status: 200,
    description:
      'Get a single recipe using lazy loading (ie will not load ingredients)',
    type: RecipeEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not ${id} found',
  })
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const recipe = await this.recipesService.findOne(id);
    if (!recipe) {
      return res.status(404).json({ message: `Recipe ${id} not found` });
    }
    return res.status(200).json(recipe);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Recipe updated',
    type: RecipeEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Error updating recipe',
  })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    const updatedRecipe = await this.recipesService.update(id, updateRecipeDto);

    if (!updatedRecipe) {
      return res.status(400).json({ message: `Recipe ${id} not updated` });
    }

    return res.status(200).json(updatedRecipe);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete a recipe',
    type: RecipeEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Recipe not deleted',
  })
  async remove(@Res() res: Response, @Param('id') id: string) {
    const deletedRecipe = await this.recipesService.remove(id);

    if (!deletedRecipe) {
      return res.status(400).json({ message: `Recipe ${id} not deleted` });
    }

    return res.status(200).json(deletedRecipe);
  }

  @Patch(':id/ingredients')
  @ApiResponse({
    status: 200,
    description:
      'Update a recipe with provided data, if ingredients are provided, the old one will be deleted and only new ones will be saved',
    type: RecipeEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Recipe not updated',
  })
  async updateRecipeIngredients(
    @Res() res: Response,
    @Param('id') recipeId: string,
    @Body() updateRecipeIngredienstDto: UpdateRecipeIngredientsDto,
  ) {
    const updateRecipeIngredients =
      await this.recipesService.updateRecipeIngredients(
        recipeId,
        updateRecipeIngredienstDto,
      );

    if (!updateRecipeIngredients) {
      return res
        .status(400)
        .json({ message: `invalid ingredient IDs provided` });
    }

    return res.status(200).json(updateRecipeIngredients);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get a single recipe with its ingredients',
    type: RecipeEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not ${id} found',
  })
  async getRecipeWithIngredients(
    @Res() res: Response,
    @Param('id') recipeId: string,
  ) {
    const recipe = await this.recipesService.getRecipeWithIngredients(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: `Recipe ${recipeId} not found` });
    }
    return res.status(200).json(recipe);
  }
}
