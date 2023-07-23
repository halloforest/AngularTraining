import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export interface Material {
    item: string;
    amount: string;    
}

export interface Ingredient {
    materials: Material[];   
}

export interface Recipe {
    name: string;
    description: string;
    imagePath: string;
    ingredient: Ingredient;
}

@Injectable({
    providedIn: 'root' // Indicates that this service should be provided at the root level
  })
export class RecipeService {
    recipes : Recipe[] =  [
        // {   
        //     name: "Currywurstpfanne", 
        //     description: "Die Bratwürste in Scheiben schneiden und Öl in einer beschichteten Pfanne erhitzen. Die Bratwurstscheiben darin braten und anschließend herausnehmen.", 
        //     imagePath: "https://img.chefkoch-cdn.de/rezepte/1491281254218855/bilder/1493847/crop-960x640/currywurstpfanne.jpg",
        //     ingredient: { materials: [{ item: "Bratwürste", amount: "300g" }, { item: "Tomatenpaprika", amount: "350g" }] }
        // },
        // {   
        //     name: "Yvonnes Wikingertopf", 
        //     description: "Das gemischte Hackfleisch mit Salz, Pfeffer und Paprikapulver würzen. Dann kleine Bällchen formen und diese in einer Pfanne mit etwas Öl kräftig rundherum braun braten. Die gewürfelte Zwiebel hinzufügen und mitbraten. Die Erbsen und Möhren hinzufügen und mit 300 ml Fleischbrühe ablöschen. Nun die Sahne hinzufügen und alles 5 min bei mittlerer Hitze köcheln lassen.", 
        //     imagePath: "https://img.chefkoch-cdn.de/rezepte/1738671282836420/bilder/702602/crop-642x428/yvonnes-wikingertopf.jpg",
        //     ingredient: { materials: [{ item: "Fleischbrühe", amount: "300g" }, { item: "Sahne", amount: "200 Stück" }, { item: "Erbsen und Möhren", amount: "1 kl. Dose/n" }] }
        // },
        // {   
        //     name: "Paprika-Sahne-Hähnchen", 
        //     description: "Die Hähnchenfilets waschen und mit Küchenkrepp trocken tupfen. Mit Salz und Paprikapulver würzen und in einer Auflaufform dicht aneinanderlegen. Die Paprikaschoten waschen, entkernen, in schmale Streifen schneiden und auf den Filets verteilen.", 
        //     imagePath: "https://img.chefkoch-cdn.de/rezepte/22771005725755/bilder/668507/crop-642x428/paprika-sahne-haehnchen.jpg",
        //     ingredient: { materials: [{ item: "Hähnchenbrustfilet(s)", amount: "4" }, { item: "Paprikaschote(n), rote", amount: "2" }] }
        // },
        // {   
        //     name: "High Protein Feta-Muffins", 
        //     description: "Den Backofen auf 200 Grad (Heißluft) vorheizen. Flammkuchenteig in 12 x 12 cm große Kreise ausstechen. Die Muffin-Form mit dem Speiseöl einstreichen und die Teigkreise in die Mulden drücken.", 
        //     imagePath: "https://img.chefkoch-cdn.de/rezepte/4112331648715515/bilder/1451487/crop-960x640/high-protein-feta-muffins.jpg",
        //     ingredient: { materials: [{ item: "HENGLEIN Flammkuchenteig", amount: "2 Pck." }, { item: "Magerquark", amount: "250 g" }] }
        // },
        // {   
        //     name: "Pizza", 
        //     description: "Recipe for your toscana pizza.", 
        //     imagePath: "https://thestayathomechef.com/wp-content/uploads/2020/02/Italian-Style-Pizza-Dough-9.jpg",
        //     ingredient: { materials: [{ item: "Apple", amount: "2 Stück" }, { item: "Orange", amount: "330 g" }] }
        // }
    ];

    editMode: Subject<boolean> = new Subject<boolean>;
    recipesChanged: Subject<void> = new Subject<void>;

    setEditMode() {
        this.editMode.next(true);
    }

    resetEditMode() {
        this.editMode.next(false);
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next();
    }

    getMaterials(index: number): Material[] {
        return this.recipes[index].ingredient.materials;
    }

    addNewRecipe(recipe: Recipe): number {
        this.recipes.push(recipe);
        this.editMode.next(false);

        return this.recipes.length - 1;
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next();
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.editMode.next(false);
        this.recipesChanged.next();
    }
}

