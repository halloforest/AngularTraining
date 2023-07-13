import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from './auth.service';

@Injectable()
export class AuthentificationGuard {
  constructor(private authtificationService: AuthentificationService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authtificationService.isAuthenticated()
      .then((authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            this.router.navigate(['/servers', 'access-denied']);

            console.log("Redirect to ...");
            return false;
          }
        }
      );
  }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }
}
