import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRoles } from '../utils/userRoles';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { IUserInfo, IAdminInfo } from '../utils/userInfo';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private apiService: ApiIntercepterService) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }



  submitForm() {
    if (this.loginForm.valid) {
      this.apiService.post("accounts/login/", this.loginForm.value).subscribe((value: IAdminInfo) => {
        console.log(value);
        localStorage.setItem('role', "admin");
        localStorage.setItem('token', value.token);
        this.apiService.initHeaders();
        this.router.navigate(["/"]);
      });
    } else {
      this.snackBar.open("Invalid form", "error", { duration: 1000 });
    }
  }

  ngOnInit() {
  }

}
