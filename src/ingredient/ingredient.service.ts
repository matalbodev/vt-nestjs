import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService){}

  async create(createIngredientDto: CreateIngredientDto) {
    createIngredientDto.createdAt = new Date();
    const createdIngredient = await this.prisma.ingredient.create({
      data: createIngredientDto,
    });

    return createdIngredient;
  }

  async findAll() {
    const ingredients = await this.prisma.ingredient.findMany();

    if (!ingredients) {
      return [];
    }

    return ingredients;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
