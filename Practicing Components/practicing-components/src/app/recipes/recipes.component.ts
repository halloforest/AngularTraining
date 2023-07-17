import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  constructor(private recipeService: RecipeService, private router: Router) { }
  
  ngOnInit() {
  }

  getEidtMode(): boolean {
    return this.recipeService.getEditMode();
  }
  
  onClickAddButton() {
    this.recipeService.setEditMode();
    this.router.navigate(['/recipes','new']);
  }
}
