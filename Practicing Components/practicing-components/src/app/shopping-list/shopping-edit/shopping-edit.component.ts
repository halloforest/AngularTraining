import { Component } from '@angular/core';
import { ShoppingList, ShoppingListService } from '../shopping-list.service';
import { Material } from 'src/app/recipes/recipe.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent {
  shoppingList!: ShoppingList;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.shoppingList = this.shoppingListService.getShoppingList();
  }

  onClickAddButton(item: string, amount: string): void {
    var materials : Material[] = [{ item: item, amount: amount}];  
    this.shoppingListService.addShoppingList(materials);
  }


}
