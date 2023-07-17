import { Component } from '@angular/core';
import { ShoppingList, ShoppingListService } from './shopping-list.service';
import { Material } from '../recipes/recipe.service';

enum EditStatus {
  noEdit,
  add,
  update
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent {  
  hovered: boolean = false;
  EditStatus = EditStatus;
  editStatus: EditStatus = EditStatus.noEdit;
  listToUpdate: number = -1;
  infoText: string = "";

  shoppingList!: ShoppingList;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.shoppingList = this.shoppingListService.getShoppingList();
  }
  onClickDeleteButton(index: number): void {
    this.shoppingListService.deleteMaterialFromShoppingList(index);
    this.editStatus = EditStatus.noEdit;
    this.listToUpdate = -1;
  }

  onAddButton(item: string, amount: string) {
    var materials : Material[] = [{ item: item, amount: amount}];  
    this.shoppingListService.addShoppingList(materials);
    this.editStatus = EditStatus.noEdit;
  }

  onUpdateButton(index: number, item: string, amount: string) {
    this.shoppingListService.updateShoppingList(index, item, amount);
    this.editStatus = EditStatus.noEdit;
    this.listToUpdate = -1;
  }

  onClickCancel() {
    this.editStatus = EditStatus.noEdit;
    this.listToUpdate = -1;
  }

  onClickEdit(index: number) {
    if(this.editStatus === EditStatus.noEdit) {
      this.editStatus = EditStatus.update;
      this.listToUpdate = index;
    }
  }
}
