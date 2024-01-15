import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginError: boolean = false;
  error: boolean = false;
  constructor(private fb: FormBuilder,
    private service: AuthService,
    private router: Router) { }

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })

  loginUser() {
    if (this.loginForm.valid) {
      const payload = {
        username: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      }
      this.service.login(payload).subscribe((response:any) => {
        console.log(response);

        // For testing purpose, as the API giving CORS Error

        // const temp = {
        //   "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTI0MzAxOCwiaWF0IjoxNzA1MTU2NjE4LCJqdGkiOiI2YzFjOTBiYTNkMWU0MDFkYWU2OTM1ODZlNWQ3YzNkYyIsInVzZXJfaWQiOjE2NH0.KJQ9onYDr2laFefuBoaKkzER_0hn0lwXaQc-ymrE-RA",
        //   "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2ODg0NjE4LCJpYXQiOjE3MDUxNTY2MTgsImp0aSI6IjZkNDhhMmFjNDdkMjRhOGFhMDJjMjU0OTliMDM0ZDVkIiwidXNlcl9pZCI6MTY0fQ.p4EOSvmDjKXcsto6lwiKdzP0w66v8t3qRnhwuuBrUaI",
        //   "username": "cvpv123",
        //   "firstname": "cvp",
        //   "lastname": "v",
        //   "email": "cvp@gmail.com"
        // }

        const accessToken = response.access;    // change to temp for test
        this.service.setAccessToken(accessToken);

        const userName = response.firstname;    // change to temp for test
        this.service.setUserDetails(userName);

        this.router.navigate(['']);
      },
      (error) => {
        if (error.status === 401) {
          this.loginError = true;
        } else {
          // Other errors: Handle as needed
          console.error('An error occurred:', error);
          this.error = true;
        }
      })
    }
  }
}
