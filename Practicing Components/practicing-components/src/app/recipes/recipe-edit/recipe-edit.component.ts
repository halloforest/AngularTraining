import { Component } from '@angular/core';
import { Recipe, RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  recipeId: number = -1;
  recipe!: Recipe;
  editMode: boolean = false;

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() { 
    // Subscripe to the changes
    this.activatedRoute.params.subscribe(
      (params: Params) => {this.recipeId = +params['id']; this.recipe = this.recipeService.getRecipe(this.recipeId);}
    );

    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {this.editMode = (params['edit'] === '1');}
    );
  }
}
