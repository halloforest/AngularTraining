import { Component, HostListener } from '@angular/core';
import { RecipeServerService } from '../recipes/recipe-server.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isDropdownOpen: boolean = false;
  recipeServerMessage: string = "";
  recipeServerMessageSubscription!: Subscription;

  user: User | null = null;
  userSubscription!: Subscription;

  constructor(
    private recipeServerService: RecipeServerService,
    private authService: AuthService) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit() {
    this.recipeServerMessageSubscription = this.recipeServerService.recipeServerMessage.subscribe(
      (message) => {this.recipeServerMessage = message;}
    );
    
    this.userSubscription = this.authService.user.subscribe(
      (user) => {this.user = user;})
  }

  onClickSaveData() {
    this.recipeServerService.uploadRecipesToServer();
  }

  onClickFetchData() {
    this.recipeServerService.fetchRecipesFromServer();
  }

  onClickCloseButton() {
    this.recipeServerService.recipeServerMessage.next("");
  }

  ngOnDestroy() {
    if (this.recipeServerMessageSubscription) {
      this.recipeServerMessageSubscription.unsubscribe();
    }

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutsideDropdown(event: Event) {
    const targetElement = event.target as HTMLElement;
    const dropdownElement = document.querySelector('.dropdown');

    if (dropdownElement && !dropdownElement.contains(targetElement)) {
      this.isDropdownOpen = false;
    }
  }

  onClickLogout() {
    this.authService.logout();
  }
}
