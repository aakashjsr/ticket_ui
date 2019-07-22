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
  isUpdate = false;
  clients = [];
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
      clients: [null, Validators.required],
      client: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      username: [null, Validators.required],
      password: [null],
      user_type: [null, Validators.required],
      is_primary_contact: [true, Validators.required],
      is_active: [true],
      phone: [null, Validators.pattern(/\d{10}/)],
      phone_ext: [],
      cell_phone: [null, Validators.pattern(/\d{10}/)],
      notes: [],
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      if (!this.isUpdate) {
        this.apiService.post("accounts/users/", this.userForm.value).subscribe(
          value => {
            this.snackBar.open("user Added", "successfully", {
              duration: 1500
            });
            this.router.navigate(["/users"]);
          },
          err => {
            console.log(err.error);
          }
        );
      } else {
        let formData = this.userForm.value;
        delete formData.password;
        this.apiService
          .patch(`accounts/users/${this.id}/`, formData)
          .subscribe(
            value => {
              this.snackBar.open("user Details updated", "successfully", {
                duration: 1500
              });
              this.router.navigate(["/users"]);
            },
            err => {
              console.log(err.error);
            }
          );
      }
    } else {
      this.userForm.markAllAsTouched();
      console.log('--------------------------------');
    }
  }

  ngOnInit() {
    this.utils.internalDataBus.subscribe(value => {
      if (value && value.type == 'refresh_table') {
        this.userForm.reset();
        this.isUpdate = false;
        this.userForm.patchValue({ is_active: true });
      }
    });
    this.utils.currentUser.subscribe(user => {
      this.userForm.patchValue({ client: user.id });
    });

    this.apiService.get<Array<any>>("accounts/clients/").subscribe(value => {
      this.clients = value;

      this.utils.internalDataBus.subscribe(value => {
        if (value && value.type == "edit-user") {
          console.log(value.data);
          this.isUpdate = true;
          this.id = value.data.id;
          this.userForm.patchValue(value.data);
          // this.userForm.controls['password'].disable();
        }
      });


    });


  }
}
