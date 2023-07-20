import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes/recipes.component';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '',                   redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes',            component: RecipesComponent, canActivate:[AuthGuardService], resolve: [RecipeResolverService], children: [
    { path: '',                 component: RecipeDetailComponent},
    { path: 'new',              component: RecipeEditComponent},
    { path: ':id/:name/edit',   component: RecipeEditComponent},   
    { path: ':id/:name',        component: RecipeDetailComponent} ]}, 
  { path: 'shopping-list',      component: ShoppingListComponent},
  { path: 'login',              component: AuthComponent},
  { path: 'page-not-found',     component: PageNotFoundComponent},
  { path: '**',                 redirectTo: '/page-not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
