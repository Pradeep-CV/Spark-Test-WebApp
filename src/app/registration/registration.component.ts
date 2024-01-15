import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private router: Router) { }

  registrationForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    firstName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
    lastName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
    userName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)])],
    passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)])]
  })

  registerUser() {
    if (this.registrationForm.valid) {
      const payload = {
        email: this.registrationForm.value.email,
        first_name: this.registrationForm.value.firstName,
        last_name: this.registrationForm.value.lastName,
        username: this.registrationForm.value.userName,
        password: this.registrationForm.value.password,
        password2: this.registrationForm.value.passwordConfirm
      }
      this.service.register(payload).subscribe(result => {
        console.log(result);
        this.router.navigate(['/login']);
      })
    }
  }

}


