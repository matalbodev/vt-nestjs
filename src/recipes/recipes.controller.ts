import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Recipe } from './entities/recipe.entity';

@Controller('recipes')
@ApiTags('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new recipe',
    type: Recipe,
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
    type: [Recipe],
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

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get a single recipe',
    type: Recipe,
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
    type: Recipe,
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
    type: Recipe,
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
}
