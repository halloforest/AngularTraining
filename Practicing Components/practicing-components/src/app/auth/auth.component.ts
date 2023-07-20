import { Component, ViewChild } from '@angular/core';
import { AuthRequestPayload, AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  authRequestPayload !: AuthRequestPayload;
  
  authMessage: string = "";
  authMessageSubscription !: Subscription;

  user: User | null = null;
  userSubscription !: Subscription;


  // Get access to html component from ts
  @ViewChild('signUpForm') signUpForm!: NgForm;
  @ViewChild('signInForm') signInForm!: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  showSignUp: any;

  ngOnInit() {
    this.authMessageSubscription = this.authService.authMessage.subscribe(
      (authMessage) => {this.authMessage = authMessage;}
    );

    this.userSubscription = this.authService.user.subscribe(
      (user) => {
        this.user = user;
        if(this.user != null) {this.router.navigate(['/']);}} // Redirect to homepage after successful login/signup
    );
  }


  showSignUpForm() {}

  onClickSignUpSubmit() {
    this.authRequestPayload = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      returnSecureToken: true 
    }
    this.authService.signUp(this.authRequestPayload);
  }

  onClickSignInSubmit() {
    this.authRequestPayload = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
      returnSecureToken: true 
    }
    this.authService.signIn(this.authRequestPayload);
  }


  showLoginForm() {}

  ngOnDestroy() {
    if (this.authMessageSubscription) {
      this.authMessageSubscription.unsubscribe();
    }

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
