import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { Router } from "@angular/router";
import { UtilsService } from "../services/utils.service";
//show email validation error;
@Component({
  selector: "app-add-vendors",
  templateUrl: "./add-vendors.component.html",
  styleUrls: ["./add-vendors.component.scss"]
})
export class AddVendorsComponent implements OnInit {
  private resolve: Function | null = null;
  vendorForm: FormGroup;
  isupdate = false;
  clientName: Promise<string> | null = new Promise((resolve, reject) => { this.resolve = resolve; });
  id: string;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private apiService: ApiIntercepterService,
    public utils: UtilsService
  ) {
    this.vendorForm = this.fb.group({
      client: [null],
      name: [null, Validators.required],
      phone: [null, [Validators.required,]],
      email: [null, Validators.pattern(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/)],
      address: [null,],
      service: [null, Validators.required],
      website: [null, Validators.required],
      support_website: [null],
      verified_date: [],
      is_active: [true]
    });
  }

  ngOnInit() {
    let currentPathParams = this.router.url.split("/");
    console.log(currentPathParams);
    if (currentPathParams.length == 3) {
      this.id = currentPathParams.pop();
      this.isupdate = true;
      this.apiService.get(`entities/vendors/${this.id}/`).subscribe((vendors) => {
        console.log(vendors, '--------------vendors------------------');
        this.vendorForm.patchValue(vendors);
        this.vendorForm.patchValue({ is_active: true });
      });
    }

    this.utils.currentUser.subscribe((user) => {
      if (!user) return;
      this.resolve(user.name);
      this.clientName = new Promise((resolve, reject) => { resolve(user.name) });
    });
  }

  submitForm() {
    if (this.vendorForm.valid) {
      this.vendorForm.patchValue({ client: JSON.parse(this.utils.getCookie('client'))['id'] });
      if (!this.isupdate) {
        this.apiService
          .post("entities/vendors/", this.vendorForm.value)
          .subscribe(value => {
            this.snackBar.open("vendor added", "Successfully", {
              duration: 3000
            });
            this.router.navigate(["/vendors"]);
          });
      } else {
        this.apiService
          .put(`entities/vendors/${this.id}/`, this.vendorForm.value)
          .subscribe(value => {
            this.snackBar.open("vendor updated", "Successfully", {
              duration: 3000
            });
            this.router.navigate(["/vendors"]);
          });
      }
    } else {
      this.vendorForm.markAllAsTouched();
    }
  }
}
