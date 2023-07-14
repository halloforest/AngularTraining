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
      (params: Params) => {this.recipeId = +params['id']; this.recipe = this.recipeService.getRecipe(this.recipeId);}
    );

    if(this.activatedRoute.snapshot.params['id'] == null) {
      this.recipeId = 0;
      this.recipe = this.recipeService.getRecipe(this.recipeId);
    }
  }

  onClickAddButton() {
    this.shoppingListService.addShoppingList(this.recipeService.getMaterials(this.recipeId));
  }
  
  onClickEditButton() {
    this.router.navigate(['/recipes', this.recipeId, this.recipeService.getRecipe(this.recipeId).name, 'edit'], {queryParams: {edit: '1'}});
  }
}
