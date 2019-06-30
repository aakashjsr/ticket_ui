import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  IsPrimaryContact: boolean;
  IsActive: boolean;
  clients = []
  constructor(
    private fb: FormBuilder
    , private apiService: ApiIntercepterService
    , private router: Router
    , private snackBar: MatSnackBar
    , public utils: UtilsService
    , public changeRef: ChangeDetectorRef
  ) {
    this.userForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      clients: [null, Validators.required],
      device_id: [null,],
      email: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      lan_ip: [],
      user_type: [null, Validators.required],
      is_primary_contact: [true, Validators.required],
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
      }, err => {
        console.log(err.error);
      });
    }
  }

  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      this.userForm.patchValue({ client: user.id });
    });

    this.apiService.get<Array<any>>("accounts/clients").subscribe((value) => {
      this.clients = value;
    });
  }

}
