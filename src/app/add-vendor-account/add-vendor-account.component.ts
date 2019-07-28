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
  clientName: Promise<string>;
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
      account: [null, Validators.required],
      username: [null],
      password: [null],
      client: [null],
      client_site: [null, Validators.required],
      notes: [],
      vendor: [null, Validators.required],
      support_expiration: [null],
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

    const urlParams = this.router.url.split("/");
    console.log(urlParams);

    if (urlParams.length == 3) {
      this.id = urlParams.pop();
      this.isUpdated = true;
      this.apiService.get(`entities/vendor-accounts/${this.id}/`).subscribe((v_acc: any) => {
        this.vendorAccountForm.patchValue({ ...v_acc, client: v_acc.client.id, client_site: v_acc.client_site.id, vendor: v_acc.vendor.id });
      });
    } else {
      this.vendorAccountForm.patchValue({ is_active: true });
    }
    this.utils.currentUser.subscribe(user => {
      if (!user || !user.id) return;
      this.clientName = new Promise((resolve, reject) => resolve(user.name));
      this.vendorAccountForm.patchValue({ client: user.id });
      this.apiService.get<IVendor[]>("entities/vendors/", { client: user.id })
        .subscribe(vendors => this.vendors.push(...vendors));
    });

    this.utils.clients.subscribe(value => {
      this.clients = value;
    });


    this.utils.currentUser.subscribe(client => {
      if (!client) return;
      this.apiService.get<IclientSite[]>("entities/client-sites/", { client: client.id })
        .subscribe(client_ites => this.clientSites = client_ites);
    });

  }
}
