import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  heading: string = '';
  body: string = '';

  onCloseError() {
    this.heading = '';
    this.body = '';
  }

  onClickError() {
    this.heading = 'Password Error';
    this.body = 'Please enter a valid password.';
  }
}
