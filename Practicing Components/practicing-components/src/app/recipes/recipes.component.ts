import { Component } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  recipe: Recipe = new Recipe("Hotdog", "Recipe for Hotdog", "https://www.gusto.at/_storage/asset/5720541/storage/womanat:slideshow-large/file/81812868/r_5391.jpg");
  onRecipeSelected(recipe : Recipe) {
    this.recipe = recipe;  
  }
}
