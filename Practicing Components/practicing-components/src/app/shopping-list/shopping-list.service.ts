import { Material } from "../recipes/recipe.service";

export interface ShoppingList {
    materials: Material[];   
}

export class ShoppingListService {
    shoppingList: ShoppingList = {
        materials: [
            { item: "Bratwürste", amount: "300 g" },
            { item: "Tomatenpaprika", amount: "350 g"}
        ]};
    
    addShoppingList(materials: Material[]): void {
        if(materials === null) return;

        for(let i = 0; i < materials.length; i++) {
            this.shoppingList.materials.push(materials[i]);    
        }
    }

    updateShoppingList(index: number, item: string, amount: string): void {
        this.shoppingList.materials[index].item = item;
        this.shoppingList.materials[index].amount = amount;      
    }

    getShoppingList(): ShoppingList {
        return  this.shoppingList;
    }

    deleteMaterialFromShoppingList(index: number) : void {
        this.shoppingList.materials.splice(index, 1);   
    }
}