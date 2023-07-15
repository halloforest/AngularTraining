import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genders = ['Male', 'Female'];
  signupForm: any;
  forbiddenNames: string[] = ["Anna", "Max"];


  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.checkForbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl(null),
      'hobbies': new FormArray([new FormControl(null, Validators.required)])
    });
  }

  onFormSubmit() {
    console.log(this.signupForm);
  }

  onAddAnotherHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  getControls() : any {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  onClickDeleteHobbyButton(index: number) {
    this.signupForm.get('hobbies').controls.splice(index, 1);
    this.signupForm.updateValueAndValidity();
  }

  checkForbiddenNames(control: FormControl): {[s: string]: boolean} | null {
    if(this.forbiddenNames.includes(control.value)) {
      return {'namesIsForbidden': true};
    }
    return null;
  }
}
