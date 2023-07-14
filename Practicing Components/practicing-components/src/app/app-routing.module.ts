import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes/recipes.component';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  { path: '',                   redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes',            component: RecipesComponent, children: [
    { path: '',                 component: RecipeDetailComponent},
    { path: 'new',              component: RecipeEditComponent},
    { path: ':id/:name/edit',   component: RecipeEditComponent},   
    { path: ':id/:name',        component: RecipeDetailComponent}]},
  { path: 'shopping-list',      component: ShoppingListComponent},
  { path: 'page-not-found',     component: PageNotFoundComponent},
  { path: '**',                 redirectTo: '/page-not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
