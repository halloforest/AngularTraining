import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Resolve } from '@angular/router';
import { RecipeServerService } from './recipe-server.service';
import { User } from '../auth/user.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<void> {
  user: User | null = null;

  constructor(
    private recipeServerService: RecipeServerService,
    private recipeService: RecipeService ) { }

  resolve() {
    // In case no recipe exists, fetch from server
    if (this.recipeService.recipes.length === 0) {
      this.recipeServerService.fetchRecipesFromServer();
    }
  }
}
