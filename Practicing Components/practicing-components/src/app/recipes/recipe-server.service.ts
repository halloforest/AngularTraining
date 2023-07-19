import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, filter, map, tap, timer } from 'rxjs';
import { Ingredient, Recipe, RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeServerService {
  messageToHeader: Subject<string> = new Subject<string>;

  serverUrl: string = `https://angular-learning-72e80-default-rtdb.europe-west1.firebasedatabase.app`;

  constructor(private http: HttpClient, private recipeService: RecipeService) {}


  ngOnInit() {
  }

    // Return the http, leave the subscriber in the calling component
  uploadRecipesToServer() {
      // Send Http request
      // !!!
      // Difference between put and post:
      // POST is used to create new resources, while PUT is used to update or replace existing resources.    
      this.http
        .put(this.serverUrl + `/recipes.json`, this.recipeService.getRecipes())    
        .subscribe(
          () => {
            this.messageToHeader.next("Recipes were uploaded to the server successfully!");

            // Automatically clear the message after 5 second
            timer(5000).pipe(tap(() => {this.messageToHeader.next("");})).subscribe();
          },
          error => {
            this.messageToHeader.next("Save recipes error: " + error.message);
            
            // Automatically clear the message after 5 second
            timer(5000).pipe(tap(() => {this.messageToHeader.next("");})).subscribe();
          }
        );
  }

  fetchRecipesFromServer() {
    this.http
      .get<Recipe[]>(this.serverUrl + '/recipes.json')
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
          this.messageToHeader.next("Recipes were downloaded from the server successfully!");
          
          // Automatically clear the message after 5 second
          timer(5000).pipe(tap(() => {this.messageToHeader.next("");})).subscribe();
        },
        error => {
          this.messageToHeader.next("Fetch recipes error: " + error.message);

          // Automatically clear the message after 5 second
          timer(5000).pipe(tap(() => {this.messageToHeader.next("");})).subscribe();
        }
      );
  }
}