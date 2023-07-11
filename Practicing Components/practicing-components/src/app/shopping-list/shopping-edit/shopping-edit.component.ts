import { Component } from '@angular/core';
import { ShoppingItem } from 'src/app/recipes/recipe.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent {
  shoppingItem: ShoppingItem = new ShoppingItem("", 0);
  shoppingItems: ShoppingItem[] = [];

  onClickAddButton(item: string, amount: string) {
    this.shoppingItem = new ShoppingItem(item, parseInt(amount));
    this.shoppingItems.push(this.shoppingItem);
  }

  onClickDeleteButton(i: number) {
    this.shoppingItems.splice(i, 1);
  }
}
