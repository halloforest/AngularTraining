import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipeResolverService } from './recipe-resolver.service';

const recipesRoutes: Routes = [
  { path: '',     // In case in lazy mode, delete the path 'recipes' here          
    component: RecipesComponent, 
    canActivate:[AuthGuardService],
    resolve: [RecipeResolverService], 
    children: [
      { path: '',                 component: RecipeDetailComponent},
      { path: 'new',              component: RecipeEditComponent},
      { path: ':id/:name/edit',   component: RecipeEditComponent},   
      { path: ':id/:name',        component: RecipeDetailComponent}
   ]
  }
];

@NgModule({
  declarations: [               // Define components
    RecipeListComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    NewRecipeComponent
  ],
  imports: [                  // Imports other module
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(recipesRoutes)
  ],
  // exports: [                  // Exposes own components to other module
  //   RecipeListComponent,
  //   RecipesComponent,
  //   RecipeDetailComponent,
  //   RecipeItemComponent,
  //   RecipeEditComponent,
  //   NewRecipeComponent,
  // ]
})
export class RecipesModule { }
