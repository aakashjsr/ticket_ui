import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRoles } from '../utils/userRoles';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { IUserInfo, IAdminInfo } from '../utils/userInfo';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UtilsService } from '../services/utils.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

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
    private utils: UtilsService,
    public dialog: MatDialog,
    private apiService: ApiIntercepterService) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }



  submitForm() {
    if (this.loginForm.valid) {
      this.apiService.post("accounts/login/", this.loginForm.value).subscribe((value: IAdminInfo) => {
        this.utils.setCookies(value);
        this.apiService.initHeaders();
        this.router.navigate(["/"]);
      });
    } else {
      this.snackBar.open("Invalid form", "error", { duration: 1000 });
    }
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
