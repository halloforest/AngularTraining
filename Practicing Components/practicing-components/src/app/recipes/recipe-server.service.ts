import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription, filter, map, tap, timer } from 'rxjs';
import { Ingredient, Recipe, RecipeService } from './recipe.service';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecipeServerService {
  recipeServerMessage: Subject<string> = new Subject<string>;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {
  }

    // Return the http, leave the subscriber in the calling component
  uploadRecipesToServer() {
    // Send Http request
    // !!!
    // Difference between put and post:
    // POST is used to create new resources, while PUT is used to update or replace existing resources.    
    this.http
      .put(environment.dataBaseUrl + `/recipes.json`, this.recipeService.getRecipes(), {params: this.getHttpParams()})    
      .subscribe(
        () => {
          this.recipeServerMessage.next("Recipes were uploaded to the server successfully!");

          // Automatically clear the message after 5 second
          timer(5000).pipe(tap(() => {this.recipeServerMessage.next("");})).subscribe();
        },
        error => {
          this.recipeServerMessage.next("Save recipes error: " + error.message);
          
          // Automatically clear the message after 5 second
          timer(5000).pipe(tap(() => {this.recipeServerMessage.next("");})).subscribe();
        }
      );
  }

  fetchRecipesFromServer() {
    this.http
      .get<Recipe[]>(environment.dataBaseUrl + '/recipes.json', {params: this.getHttpParams()})
      .pipe(
        map((recipes: Recipe[]) => {
          const emptyIngredient: Ingredient = {materials: []};

          const filteredRecipes = recipes.filter(recipe => recipe !== null);        // Filter the NULL elements
          return filteredRecipes.map(recipe => {
            return {
              ...recipe,
              ingredient: recipe.ingredient ? recipe.ingredient : emptyIngredient   // Add an empty ingredient property if it is null
            };
          });
        })
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
          this.recipeServerMessage.next("Recipes were downloaded from the server successfully!");
          
          // Automatically clear the message after 5 second
          timer(5000).pipe(tap(() => {this.recipeServerMessage.next("");})).subscribe();
        },
        error => {
          this.recipeServerMessage.next("Fetch recipes error: " + error.message);

          // Automatically clear the message after 5 second
          timer(5000).pipe(tap(() => {this.recipeServerMessage.next("");})).subscribe();
        }
      );
  }

  private getHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    let user = this.authService.user.getValue(); // Get the current value from BehaviorSubject
    if(user && user.token) {
      httpParams = httpParams.set('auth', user.token)
    }
    return httpParams;
  }
}