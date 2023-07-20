import { Component } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingListService]
})
export class AppComponent {
  title = 'practicing-components';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoSignIn();
  }
}
