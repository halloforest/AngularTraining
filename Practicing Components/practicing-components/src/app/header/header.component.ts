import { Component } from '@angular/core';
import { RecipeServerService } from '../recipes/recipe-server.service';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isDropdownOpen: boolean = false;
  messageFromRecipeServerService: string = "";
  messageToHeaderSubscription: Subscription = this.recipeServerService.messageToHeader.subscribe(
    message => {this.messageFromRecipeServerService = message;}
  );

  editMode: boolean = false;
  editModeSubscription : Subscription = this.recipeService.editMode.subscribe(value => {this.editMode = value}); ;

  constructor(
    private recipeServerService: RecipeServerService,
    private recipeService: RecipeService, 
    private router: Router) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit() {
  }

  onClickSaveData() {
    this.recipeServerService.uploadRecipesToServer();
  }

  onClickFetchData() {
    this.recipeServerService.fetchRecipesFromServer();
  }

  onClickCloseButton() {
    this.recipeServerService.messageToHeader.next("");
  }

  ngOnDestroy() {
    if (this.messageToHeaderSubscription) {
      this.messageToHeaderSubscription.unsubscribe();
    }
    
    if (this.editModeSubscription) {
      this.editModeSubscription.unsubscribe();
    }
  }

  onClickAddButton() {
    this.recipeService.setEditMode();
    this.router.navigate(['/recipes','new']);
  }
}
