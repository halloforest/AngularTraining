import { Component } from '@angular/core';
import { Recipe, RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent {
  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService) {}

  getSelectedRecipe(): Recipe {
    return this.recipeService.getSelectedRecipe();
  }

  onClickAddButton() {
    this.shoppingListService.addShoppingList(this.recipeService.getSelectedMaterials());
  }
}
