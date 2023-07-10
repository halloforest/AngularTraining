import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'OddEven';
  evenNumbers: number[] = [];
  oddNumbers: number[] = []; 

  onTimerIncreased(timer: number) {
    if(timer %2 === 0) this.evenNumbers.push(timer);
    else this.oddNumbers.push(timer); 
  }

  onReset() {
    this.evenNumbers = [];
    this.oddNumbers = [];
  }
}
