import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserRoles } from '../utils/userRoles';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  IsPrimaryContact: boolean;
  IsActive: boolean;
  userRoles: string[];
  constructor(
    private fb: FormBuilder
    , private apiService: ApiIntercepterService
    , private router: Router
    , private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      first_name: [null,],
      last_name: [null,],
      email: [null],
      username: [null,],
      password: [null],
      primary_company: [null,],
      user_type: [null],
      related_company: [],
      is_primary_contact: [],
      is_active: [],
      phone: [],
      phone_ext: [],
      cell_phone: [],
      notes: []
    });
  }


  submitForm() {
    if (this.userForm.valid) {
      this.apiService.post("accounts/users/", this.userForm.value).subscribe((value) => {
        this.snackBar.open("user Added", "successfully", {
          duration: 800
        });
        this.router.navigate(["/"]);
      })
    }
  }

  ngOnInit() {
    this.userRoles = Object.values(UserRoles);
  }

}
