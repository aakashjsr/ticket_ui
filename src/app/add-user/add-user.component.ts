import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  IsPrimaryContact: boolean;
  IsActive: boolean;
  isSuperAdmin = false;
  isUpdate = false;
  clientsList = [];
  id: string;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiIntercepterService,
    private router: Router,
    private snackBar: MatSnackBar,
    public utils: UtilsService,
    public changeRef: ChangeDetectorRef
  ) {
    this.userForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      clients: [[], [Validators.required]],
      client: [null],
      email: [null, [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      username: [null, Validators.required],
      password: [null, Validators.required],
      user_type: [null, Validators.required],
      is_primary_contact: [true, Validators.required],
      is_active: [true],
      phone: [null,],
      phone_ext: [],
      cell_phone: [null,],
      notes: [],
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      this.userForm.patchValue({ client: JSON.parse(this.utils.getCookie('client'))['id'] });
      if (!this.isUpdate) {
        this.apiService.post("accounts/users/", this.userForm.value).subscribe(
          value => {
            this.snackBar.open("user Added", "successfully", {
              duration: 1500
            });
            this.router.navigate(["/users"]);
          },
          err => {

            if (err.error.email) {
              this.snackBar.open("Email Error:", err.error.email, {
                duration: 1500
              });
            }
            console.log(err);
          }
        );
      } else {
        let formData = this.userForm.value;
        console.log(this.userForm.value);

        delete formData.password;
        this.apiService
          .patch(`accounts/users/${this.id}/`, formData)
          .subscribe(
            value => {
              this.snackBar.open("User Details updated", "successfully!", {
                duration: 1500
              });
              this.router.navigate(["/users"]);
            },
            err => {

              if (err.error.email) {
                this.snackBar.open("Email Error:", err.error.email, {
                  duration: 1500
                });
              }
              console.log(err);
            }
          );
      }
    } else {
      this.userForm.markAllAsTouched();
      console.log('--------------------------------', this.userForm.value);
    }
  }

  ngOnInit() {
    this.userForm.patchValue({ is_active: true });
    let urlParams = this.router.url.split("/");
    if (urlParams.length == 3) {
      this.id = urlParams.pop();
      this.isUpdate = true;
      this.apiService.get(`accounts/users/${this.id}/`).subscribe((user) => {
        this.userForm.patchValue(user);
        this.userForm.controls.password.setValidators(null);
        this.userForm.controls['password'].disable();
      });
    }
    this.utils.internalDataBus.subscribe(value => {
      if (value && value.type == 'refresh_table') {
        this.userForm.reset();
        this.isUpdate = false;
      }
    });
    this.utils.clients.subscribe(clients => {
      this.clientsList = clients;
    });
    this.isSuperAdmin = this.utils.getCookie('user_type') == 'global_admin';
  }
}
