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

  ngOnInit() {
    this.getRecipes()
  }

  getRecipes(): Recipe[] {
    return this.recipeService.recipes;  
  } 
}
