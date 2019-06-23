import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRoles } from '../utils/userRoles';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }



  submitForm() {
    localStorage.setItem('role', UserRoles.ADMIN);
    localStorage.setItem('token', 'fjkdefjkdjfkefjkefefe');
    this.router.navigate(["/"])
  }

  ngOnInit() {
  }

}
