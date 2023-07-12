import { Component } from '@angular/core';
import { Recipe, RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService) {}

  onClick(index: number) {
    this.recipeService.updateSelectedRecipeIndex(index);
  }

  ngOnInit() {
    this.recipes = this.recipeService.recipes;
  }
}
