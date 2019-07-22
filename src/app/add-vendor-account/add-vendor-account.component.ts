import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { UtilsService } from "../services/utils.service";
import { IclientSite, IVendor } from '../utils/userInfo';

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
  id: string;
  vendors = [];
  clientSites: IclientSite[] = [];
  constructor(
    private fb: FormBuilder,
    private apiService: ApiIntercepterService,
    private router: Router,
    private snackBar: MatSnackBar,
    public utils: UtilsService
  ) {
    this.vendorAccountForm = this.fb.group({
      account: [null],
      username: [null],
      password: [null],
      client: [null, Validators.required],
      client_site: [null, Validators.required],
      notes: [],
      vendor: [],
      support_expiration: [null, Validators.required],
      license_key: [],
      is_active: [true]
    });
  }

  //addvendor account

  submitForm() {
    if (this.vendorAccountForm.valid) {
      if (!this.isUpdated) {
        this.apiService
          .post("entities/vendor-accounts/", this.vendorAccountForm.value)
          .subscribe(value => {
            this.snackBar.open("Vendor Added", "successfully", {
              duration: 800
            });
            this.router.navigate(["/vendors-accounts"]);
          });
      } else {
        this.apiService
          .put(
            `entities/vendor-accounts/${this.id}/`,
            this.vendorAccountForm.value
          )
          .subscribe(value => {
            this.snackBar.open("Vendor Added", "successfully", {
              duration: 800
            });
            this.router.navigate(["/vendors-accounts"]);
          });
      }
    } else {
      this.vendorAccountForm.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.utils.internalDataBus.subscribe(value => {
      if (value && value.type == 'refresh_table') {
        this.vendorAccountForm.reset();
        this.vendorAccountForm.patchValue({ is_active: true });
        this.isUpdated = false;
      }
    });
    this.utils.currentUser.subscribe(user => {
      if (!user || !user.id) return;
      this.vendorAccountForm.patchValue({ client: user.id });
      this.apiService.get<IVendor[]>("entities/vendors/", { client: user.id })
        .subscribe(vendors => this.vendors.push(...vendors));
    });

    this.apiService.get<Array<any>>("accounts/clients/").subscribe(value => {
      this.clients = value;
    });

    this.utils.internalDataBus.subscribe(value => {
      if (value && value.type == "edit-vac") {
        this.vendorAccountForm.patchValue(value.data);
        this.isUpdated = true;
        this.id = value.data.id;
      }
    });
    this.utils.client_sites.subscribe((c_sites) => {
      if (c_sites) {
        console.log(c_sites);
        this.clientSites.push(...c_sites);
      }
    });
  }
}
