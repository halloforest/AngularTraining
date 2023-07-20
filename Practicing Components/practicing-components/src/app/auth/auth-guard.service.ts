import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate { 
  constructor(
    private authService: AuthService,
    private router: Router) { }
  
  canActivate():  UrlTree | boolean {
    if(this.authService.user.getValue() == null) {
      return this.router.createUrlTree(['/login']);;
    } else {
      return true;
    }
  }
}
