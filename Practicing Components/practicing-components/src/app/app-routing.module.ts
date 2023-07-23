import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
  { path: '',                   redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: "recipes",
    loadChildren: () =>
      import("./recipes/recipes.module").then(m => m.RecipesModule)   // Lazy loading, remeber to delete the path in the target module and delete the module from app.module
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./shopping-list/shopping-list.module").then(m => m.ShoppingListModule)   // Lazy loading, remeber to delete the path in the target module and delete the module from app.module
  },
  {
    path: "login",
    loadChildren: () =>
      import("./auth/auth.module").then(m => m.AuthModule)   // Lazy loading, remeber to delete the path in the target module and delete the module from app.module
  },
  { path: 'page-not-found',     component: PageNotFoundComponent},
//  { path: '**',                 redirectTo: '/page-not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules} )],
  exports: [RouterModule]       // Necessary here because it is needed in other module
})
export class AppRoutingModule { }
