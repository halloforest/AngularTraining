import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  editMode: boolean = false;
  editModeSubscription!: Subscription;
  
  constructor(private recipeService: RecipeService, private router: Router) { }
  
  ngOnInit() {
    this.recipeService.editMode.subscribe(value => {this.editMode = value});
  }
  
  onClickAddButton() {
    this.recipeService.setEditMode();
    this.router.navigate(['/recipes','new']);
  }

  ngOnDestroy() {
    if (this.editModeSubscription) {
      this.editModeSubscription.unsubscribe();
    }
  }
}
