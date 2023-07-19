import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { RecipeServerService } from './recipe-server.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<void> {

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
