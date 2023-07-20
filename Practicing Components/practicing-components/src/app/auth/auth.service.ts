import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthRequestPayload {
  email: string,
  password:string,
  returnSecureToken: boolean;
}

interface AuthResponsePayload {
  idToken: string,
  email: string,
  refreshToken: string,	
  expiresIn: string,
  localId: string,
  registered?: boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signUpEndpoint: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;
  signInEndpoint: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;
  apiKey: string = `AIzaSyB8U4v2MbNkJNyKgc3Hucv34sUtVxZSZ10`;

  authMessage: Subject<string> = new Subject<string>;
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(authRequestPayload: AuthRequestPayload) {
    this.authMessage.next("Loading...");
    this.http
      .post<AuthResponsePayload>(
        this.signUpEndpoint + this.apiKey, 
        authRequestPayload)
      .pipe(
        catchError(this.handleErrorCode),
        tap(authResponsePayload => {this.handleAuthentication(authResponsePayload)}))
      .subscribe(
        () => {
          this.authMessage.next("Sign up was successful!");
        },
        errorMessage => {
          this.authMessage.next("Sign up error: " + errorMessage);
        }
      );
  }

  signIn(authRequestPayload: AuthRequestPayload) {
    this.authMessage.next("Loading...");
    this.http
      .post<AuthResponsePayload>(
        this.signInEndpoint + this.apiKey, 
        authRequestPayload)
      .pipe(
        catchError(this.handleErrorCode),
        tap(authResponsePayload => {this.handleAuthentication(authResponsePayload)}))
      .subscribe(
        () => {
          this.authMessage.next("Sign in was successful!");
        },
        errorMessage => {
          this.authMessage.next("Sign in error: " + errorMessage);
        }
      );
  }

  private handleErrorCode(errorRes: HttpErrorResponse) {
    if (!errorRes.error || !errorRes.error.error) {
      return throwError('An unknown error occurred!');
    }
    let errorCode = errorRes.error.error.message;
    let errorMessage;

    if (errorCode.includes('EMAIL_EXISTS')) {
      errorMessage = 'The email address is already in use by another account.';
    } else if (errorCode.includes('OPERATION_NOT_ALLOWED')) {
      errorMessage = 'Password sign-in is disabled for this project.';
    } else if (errorCode.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
    } else if (errorCode.includes('EMAIL_NOT_FOUND')) {
      errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
    } else if (errorCode.includes('INVALID_PASSWORD')) {
      errorMessage = 'The password is invalid or the user does not have a password.';
    } else if (errorCode.includes('USER_DISABLED')) {
      errorMessage = 'The user account has been disabled by an administrator.';
    } else {
      errorMessage = 'Unknown error code.';
    }

    return throwError(errorMessage);
  }

  private handleAuthentication(authResponsePayload: AuthResponsePayload) {
    // Calculate the expiration date of the token by adding expiresIn (in seconds) to the current time  
    const expirationDate = new Date(new Date().getTime() + (+authResponsePayload.expiresIn) * 1000);

    const user = new User(
      authResponsePayload.email, 
      authResponsePayload.localId,
      authResponsePayload.idToken,
      expirationDate);
    this.user.next(user);

    // Start the logout countdown
    this.autoLogout(+authResponsePayload.expiresIn * 1000);

    // Save the user data locally
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);

    localStorage.removeItem('userData');
  }

  autoSignIn() { 
    // Convert from file to string
    const loadedUserString: string | null = localStorage.getItem('userData');
    if(loadedUserString == null) return;

    // Convert from string to structure
    const loadedUser: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(loadedUserString);

    // Convert from structure to User datatype
    const user = new User(
      loadedUser.email,
      loadedUser.id,
      loadedUser._token,
      new Date(loadedUser._tokenExpirationDate) // Convert from string to date
    );

    this.user.next((user.token == null)? null : user);

    // Start the logout countdown
    this.autoLogout(new Date().getTime() - new Date(loadedUser._tokenExpirationDate).getTime());
  }

  // Logout after timeout
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

}
