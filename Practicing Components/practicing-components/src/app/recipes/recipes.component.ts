import { Component } from '@angular/core';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  user: User | null = null;
  userSubscription!: Subscription;
  
  constructor(private authService: AuthService) { }
  
  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      (user) => {
        this.user = user;
      console.log("The user on recipes: ", this.user?.email);
      })
  }

  ngOnDestroy() {
    if (this.userSubscription) {this.userSubscription.unsubscribe();}
  }
}
