import { Component } from '@angular/core';
import { UserService } from './user.service';
import { CountService } from './count.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private countService: CountService, private userService: UserService) {}

  getCount() : number {
    return this.countService.count;
  }
}
