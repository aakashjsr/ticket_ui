import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { Router } from "@angular/router";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: "app-add-vendors",
  templateUrl: "./add-vendors.component.html",
  styleUrls: ["./add-vendors.component.scss"]
})
export class AddVendorsComponent implements OnInit {
  vendorForm: FormGroup;
  isupdate = false;
  id: string;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private apiService: ApiIntercepterService,
    public utils: UtilsService
  ) {
    this.vendorForm = this.fb.group({
      client: [null, Validators.required],
      name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required],
      address: [null, Validators.required],
      service: [null, Validators.required],
      website: [null, Validators.required],
      support_website: [null, Validators.required],
      verified_date: [],
      notes: []
    });
  }

  ngOnInit() {
    this.vendorForm.patchValue({ client: this.utils.currentUser.value.id });
    this.utils.internalDataBus.subscribe(value => {
      if (value && value.type == "edit-vendor") {
        this.vendorForm.patchValue(value.data);
        this.isupdate = true;
        this.id = value.data.id;
      }
    });
  }

  submitForm() {
    if (this.vendorForm.valid) {
      if (!this.isupdate) {
        this.apiService
          .post("entities/vendors/", this.vendorForm.value)
          .subscribe(value => {
            this.snackBar.open("vendor added", "Successfully", {
              duration: 1000
            });
            this.router.navigate(["/vendors"]);
          });
      } else {
        this.apiService
          .put(`entities/vendors/${this.id}/`, this.vendorForm.value)
          .subscribe(value => {
            this.snackBar.open("vendor updated", "Successfully", {
              duration: 1000
            });
            this.router.navigate(["/vendors"]);
          });
      }
    } else {
      this.vendorForm.markAllAsTouched();
    }
  }
}
