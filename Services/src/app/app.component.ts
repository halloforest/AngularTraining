import { Component } from '@angular/core';
import { Account, AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountService]
})
export class AppComponent {
  accounts: Account[] = this.accountService.accounts;

  constructor(private accountService: AccountService) {}
}
