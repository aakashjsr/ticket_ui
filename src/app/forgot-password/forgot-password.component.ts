import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(
    private apiService: ApiIntercepterService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<any>) { }

  emailForm = new FormControl(null, [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]);

  onNoClick(): void {
    this.dialogRef.close();
  }


  submitForm() {
    if (this.emailForm.valid) {
      console.log(this.emailForm.value);
      this.apiService.get("accounts/reset", { email: this.emailForm.value });
      this.snackBar.open("reset url sent to Mail", "Successfully", { duration: 3000 });
      this.onNoClick();
    }
  }
}
