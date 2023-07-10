import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit{
  timer: number = 0;
  intervalId: any;
  infoText: string = "";
  timerIsRunning: boolean = false;
  @Output() timerIncreased = new EventEmitter<number>();
  @Output() resetData = new EventEmitter<void>();

  onClickStartButton(): void {
    this.timer = 0;
    // Afte reach second: increase the timer and emit the event
    this.intervalId = setInterval(() => { this.timerIncreased.emit(this.timer); this.timer++; }, 1000);
    this.timerIsRunning = true;
  }

  onClickStopButton(): void {
    clearInterval(this.intervalId);
    this.timer = 0; 
    this.timerIsRunning = false;
    this.resetData.emit();
  }

  ngOnInit() {
  }
  
}
