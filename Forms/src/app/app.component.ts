import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface User {
  username: string;
  email: string;
  secretQuestion: string;
  answer: string;
  gender: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultQuestion: string = "pet";
  answer: string = "";
  genders: string[] = ["Male", "Female"];
  user: User = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted: boolean = false;

  // Get access to html component from ts
  @ViewChild('ngForm') ngForm!: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';

    this.ngForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.ngForm.value.userData.username;
    this.user.email = this.ngForm.value.userData.email;
    this.user.secretQuestion = this.ngForm.value.secret;
    this.user.answer = this.ngForm.value.questionAnswer;
    this.user.gender = this.ngForm.value.gender;

    this.ngForm.reset();
  }
}
