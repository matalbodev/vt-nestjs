import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService, PrismaService]
})
export class IngredientModule {}
