import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
@Output() recipeSelected = new EventEmitter<Recipe>();
  
  recipes : Recipe[] = [
    new Recipe("Pizza", "Recipe for your toscana pizza.", "https://thestayathomechef.com/wp-content/uploads/2020/02/Italian-Style-Pizza-Dough-9.jpg"),
    new Recipe("Pasta", "Yammy Pasta", "https://img.bildderfrau.de/img/rezepte/origs237822725/1977338851-w1200-h960-q85-dc1/pasta-creme-fraiche-sosse.jpg"),
    new Recipe("Pasta", "Yammy Pasta", "https://img.bildderfrau.de/img/rezepte/origs237822725/1977338851-w1200-h960-q85-dc1/pasta-creme-fraiche-sosse.jpg"),
    new Recipe("Pasta", "Yammy Pasta", "https://img.bildderfrau.de/img/rezepte/origs237822725/1977338851-w1200-h960-q85-dc1/pasta-creme-fraiche-sosse.jpg"),
    new Recipe("Pasta", "Yammy Pasta", "https://img.bildderfrau.de/img/rezepte/origs237822725/1977338851-w1200-h960-q85-dc1/pasta-creme-fraiche-sosse.jpg"),
    new Recipe("Pasta", "Yammy Pasta", "https://img.bildderfrau.de/img/rezepte/origs237822725/1977338851-w1200-h960-q85-dc1/pasta-creme-fraiche-sosse.jpg"),
  ];

  onClick(recipe : Recipe) {
    this.recipeSelected.emit(recipe);     
  }

  ngOnInit() {
    this.recipeSelected.emit(this.recipes[0]);     
  }

  
}
