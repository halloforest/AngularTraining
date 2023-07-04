import { Component } from '@angular/core';
import { Voting } from '../voting.model';

@Component({
  selector: 'app-vote-taker',
  template: `
    <div class="container">
      <h2>Should mankind colonize the Universe?</h2>
      <h3>Agree: {{agreed}}, Disagree: {{disagreed}}</h3>
      <p *ngIf="name.length > 0"> {{ name }} is {{agree}}.</p>
      <hr>

      <app-voter
        *ngFor="let voter of voters"
        [name]="voter"
        (voted)="onVoted($event)">
      </app-voter>
    </div>
  `
})
export class VoteTakerComponent {
  agreed = 0;
  disagreed = 0;
  name : string = "";
  agree : string = "";
  voters = ['Dr. IQ', 'Celeritas', 'Bombasto'];

  onVoted(voting: Voting) {
    if (voting.agree) {
      this.agreed++;
    } else {
      this.disagreed++;
    }
    this.name = voting.name;
    this.agree = voting.agree? "agree" : "disagree";
  }
}