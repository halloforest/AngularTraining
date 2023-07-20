import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {
  editMode: boolean = false;
  editModeSubscription : Subscription = this.recipeService.editMode.subscribe(value => {this.editMode = value}); ;

  constructor(private recipeService: RecipeService,  private router: Router) {}
    
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
