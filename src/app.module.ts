import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientModule } from './ingredient/ingredient.module';

@Module({
  imports: [RecipesModule, IngredientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
