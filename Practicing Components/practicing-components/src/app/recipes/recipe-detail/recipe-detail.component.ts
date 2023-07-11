import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent {
  @Input() recipe: Recipe = new Recipe("Hotdog", "Recipe for Hotdog", "https://www.gusto.at/_storage/asset/5720541/storage/womanat:slideshow-large/file/81812868/r_5391.jpg");
}
