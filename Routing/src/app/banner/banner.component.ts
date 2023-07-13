import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification/auth.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent {
  isLoggedIn: boolean = false;
  constructor(private authentificationService: AuthentificationService) {}

  ngOnInit() {
    this.isLoggedIn = this.authentificationService.loggedIn;
  }

  onClickLoginLogout() {
    if(this.authentificationService.loggedIn) {
      this.authentificationService.logout();  
    }
    else {
      this.authentificationService.login();    
    }

    this.isLoggedIn = this.authentificationService.loggedIn;
  }
}
