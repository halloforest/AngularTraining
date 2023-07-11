import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practicing-components';

  navigationSelected : string = "recipe";
  onNavigationSelected(navigationSelected : string) {
    this.navigationSelected = navigationSelected;
  }

}
