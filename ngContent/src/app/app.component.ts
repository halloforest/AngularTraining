import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ngContent';

  constructor() {
    console.log(this.constructor.name, ": constructor called!");
  }

  ngOnInit(): void {
    console.log(this.constructor.name, ": ngOnInit called!");
  }
}
