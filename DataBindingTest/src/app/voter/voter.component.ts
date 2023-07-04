import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Voting } from '../voting.model';


@Component({
  selector: 'app-voter',
  template: `
    <h4 class="mt-3">{{name}}</h4>
    <button type="button" (click)="vote(name, true)"  [disabled]="didVote" class="me-2">Agree</button>
    <button type="button" (click)="vote(name, false)" [disabled]="didVote">Disagree</button>
  `
})
export class VoterComponent {
  @Input()  name = '';
  @Output() voted = new EventEmitter<Voting>();
  didVote = false;
  voting : Voting = new Voting();

  vote(name : string, agree: boolean) {
    this.voting.name = name;
    this.voting.agree = agree;
    this.voted.emit(this.voting);
    this.didVote = true;
  }
}
