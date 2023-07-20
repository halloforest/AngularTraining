import { Component } from '@angular/core';
import { Material, RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  recipeId: number = -1;
  recipe: any;
  newRecipe: any;
  isNewRecipe: boolean = false;
  editMode: boolean = false;
  recipeEditForm: any;

  constructor(
    private recipeService: RecipeService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.recipeEditForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null),
      'ingredient': new FormArray([
        new FormGroup({
          'item': new FormControl(null),
          'amount': new FormControl(null)
        })
      ])
    });

    // Subscripe to the changes
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id']; 
        this.recipe = this.recipeService.getRecipe(this.recipeId);
        this.isNewRecipe = (params['id'] === undefined)? true : false;
        this.loadExistingRecipeToForm();
      }
    );

    this.recipeService.setEditMode();
  }

  ngOnDestroy() {
    this.recipeService.resetEditMode();
  }

  getControls() : any {
    return (this.recipeEditForm.get('ingredient') as FormArray).controls;
  }

  onAddAnotherMaterial() {
    const control = new FormGroup({
      'item': new FormControl(null),
      'amount': new FormControl(null)
    });
    (this.recipeEditForm.get('ingredient') as FormArray).push(control);
  }

  onClickDeleteMaterialButton(index: number) {
    this.recipeEditForm.get('ingredient').controls.splice(index, 1);
    this.recipeEditForm.updateValueAndValidity();
  }

  onFormSubmit() {
    this.retrieveNewRecipeFromForm();

    if(this.isNewRecipe) {
      // Push the new recipe into the recipes array
      this.recipeService.addNewRecipe(this.newRecipe);
    } else {
      if (this.recipeId != -1) {
        this.recipeService.updateRecipe(this.recipeId, this.newRecipe);
      }
    }

    this.router.navigate(['/recipes', this.recipeId, this.recipeService.getRecipe(this.recipeId).name]);
  }

  loadExistingRecipeToForm() {
    // Load values into the form if recipe exists
    if (!this.isNewRecipe && this.recipe) {
      this.recipeEditForm.patchValue({
        'name': this.recipe.name,
        'description': this.recipe.description,
        'imagePath': this.recipe.imagePath
      });

      const ingredientFormArray = this.recipeEditForm.get('ingredient') as FormArray;
      ingredientFormArray.clear(); // Clear existing controls

      for (const material of this.recipe.ingredient.materials) {
        const control = new FormGroup({
          'item': new FormControl(material.item),
          'amount': new FormControl(material.amount)
        });
        ingredientFormArray.push(control); // Add new controls
      }
    } 
  }

  retrieveNewRecipeFromForm() {
      // Retrieve the form values
      const name = this.recipeEditForm.get('name')?.value;
      const description = this.recipeEditForm.get('description')?.value;
      const imagePath = this.recipeEditForm.get('imagePath')?.value;
  
      // Retrieve the ingredient form array
      const ingredientFormArray = this.recipeEditForm.get('ingredient') as FormArray;
  
      // Create an array to hold the materials
      const materials: Material[] = [];
  
      // Loop through the ingredient form array to get material values
      ingredientFormArray.controls.forEach((control) => {
        const item = control.get('item')?.value;
        const amount = control.get('amount')?.value;
        materials.push({ item, amount });
      });
  
      // Create a new Recipe object with the form values
      this.newRecipe = {
        name,
        description,
        imagePath,
        ingredient: { materials } // Same content, different data type, use {} to convert
      };
  }
}


