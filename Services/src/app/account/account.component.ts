import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Account, AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  @Input() account: Account = {name: "", status: ""};
  @Input() id: number = 0;

  constructor(private accountService: AccountService) {}

  onStatusSetTo(status: string) {
    this.accountService.changeStatus(this.id, status)
  }
}
