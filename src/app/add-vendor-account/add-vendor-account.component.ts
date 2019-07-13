import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: "app-add-vendor-account",
  templateUrl: "./add-vendor-account.component.html",
  styleUrls: ["./add-vendor-account.component.scss"]
})
export class AddVendorAccountComponent implements OnInit {
  vendorAccountForm: FormGroup;
  IsPrimaryContact: boolean;
  IsActive: boolean;
  isUpdated = false;
  clients = [];
  constructor(
    private fb: FormBuilder,
    private apiService: ApiIntercepterService,
    private router: Router,
    private snackBar: MatSnackBar,
    public utils: UtilsService
  ) {
    this.vendorAccountForm = this.fb.group({
      client_location: [null, Validators.required],
      account: [null],
      vendor: [null],
      username: [null],
      password: [null],
      client: [null, Validators.required],
      notes: [],
      support_expiration: [null, Validators.required],
      license_key: []
    });
  }

  submitForm() {
    if (this.vendorAccountForm.valid) {
      if (!this.isUpdated) {
        this.apiService
          .post("entities/vendor-accounts/", this.vendorAccountForm.value)
          .subscribe(value => {
            this.snackBar.open("Vendor Added", "successfully", {
              duration: 800
            });
            this.router.navigate(["/vendors-account"]);
          });
      } else {
        this.apiService
          .put(
            `entities/vendor-accounts/${this.vendorAccountForm.value.client}`,
            this.vendorAccountForm.value
          )
          .subscribe(value => {
            this.snackBar.open("Vendor Added", "successfully", {
              duration: 800
            });
            this.router.navigate(["/vendors-account"]);
          });
      }
    } else {
      this.vendorAccountForm.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      this.vendorAccountForm.patchValue({ client: user.id });
    });

    this.apiService.get<Array<any>>("accounts/clients").subscribe(value => {
      this.clients = value;
    });

    this.utils.internalDataBus.subscribe(value => {
      if (value && value.type == "edit-vac") {
        this.vendorAccountForm.patchValue(value.data);
        this.isUpdated = true;
      }
    });
  }
}
