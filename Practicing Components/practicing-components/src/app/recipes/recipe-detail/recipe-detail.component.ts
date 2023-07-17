import { Component } from '@angular/core';
import { Recipe, RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent {
  recipeId: number = 0;
  recipe!: Recipe;

  constructor(private recipeService: RecipeService, 
    private shoppingListService: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() { 
    // Subscripe to the changes
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if(params['id'] == null) this.recipeId = 0;
        else if (+params['id'] >= this.recipeService.recipes.length) this.recipeId = -1;
        else this.recipeId = +params['id'];
        if(this.recipeId != -1) this.recipe = this.recipeService.getRecipe(this.recipeId);}
    );
  }

  onClickAddButton() {
    this.shoppingListService.addShoppingList(this.recipeService.getMaterials(this.recipeId));
  }
  
  onClickEditButton() {
    this.router.navigate(['/recipes', this.recipeId, this.recipeService.getRecipe(this.recipeId).name, 'edit']);
  }

  onDeleteButton() {
    this.recipeService.deleteRecipe(this.recipeId);  
    this.router.navigate(['/recipes', 0, this.recipeService.getRecipe(0).name]);
  }
}
