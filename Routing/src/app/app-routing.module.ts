import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthentificationGuard } from './authentification/authentificationGuard.service';
import { ServerAccessDeniedComponent } from './server-access-denied/server-access-denied.component';

const appRoutes: Routes = [
  { path: '',                   component: HomeComponent},
  { path: 'users',              component: UsersComponent, children: [
    { path: ':id/:name',        component: UserComponent}]},
  { path: 'servers',            component: ServersComponent, children: [
    { path: 'access-denied',    component: ServerAccessDeniedComponent},
    { path: ':id',              canActivate:[AuthentificationGuard], component: ServerComponent},
    { path: ':id/edit',         canActivate:[AuthentificationGuard], component: EditServerComponent}]},
  { path: 'page-not-found',     component: PageNotFoundComponent},
  { path: '**',                 redirectTo: '/page-not-found'},     
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
  })

export class AppRoutingModule { }