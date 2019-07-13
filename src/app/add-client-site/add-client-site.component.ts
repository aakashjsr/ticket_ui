import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: "app-add-client-site",
  templateUrl: "./add-client-site.component.html",
  styleUrls: ["./add-client-site.component.scss"]
})
export class AddClientSiteComponent implements OnInit {
  clientSiteForm: FormGroup;
  isUpdated = false;
  id: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    public utils: UtilsService,
    private apiService: ApiIntercepterService
  ) {
    this.clientSiteForm = this.fb.group({
      name: [null, Validators.required],
      client: [null, Validators.required],
      address_line_1: [null, Validators.required],
      address_line_2: [],
      city: [null, Validators.required],
      client_location: [],
      zip_code: [null, Validators.required],
      state: [null, Validators.required],
      phone: [null, Validators.required],
      fax: [],
      website: [null, Validators.required],
      client_hours: [],
      is_active: []
    });
  }
  // edit-client-site
  ngOnInit() {
    this.clientSiteForm.patchValue({ client: this.utils.currentUser.value.id });
    this.utils.internalDataBus.subscribe(deviceInfo => {
      if (deviceInfo && deviceInfo.type == "edit-client-site") {
        this.clientSiteForm.patchValue(deviceInfo.data);
        this.isUpdated = true;
        this.id = deviceInfo.data.id;
      }
    });
  }

  submitForm() {
    if (this.clientSiteForm.valid) {
      if (!this.isUpdated) {
        this.apiService
          .post("entities/client-sites/", this.clientSiteForm.value)
          .subscribe(value => {
            this.snackBar.open("Client Site Added", "Successfully", {
              duration: 1000
            });
            this.router.navigate(["/client_sites"]);
          });
      } else {
        this.apiService
          .put(
            `entities/client-sites/${this.id}/`,
            this.clientSiteForm.value
          )
          .subscribe(value => {
            this.snackBar.open("Client Site updated", "Successfully", {
              duration: 1000
            });
            this.router.navigate(["/client_sites"]);
          });
      }
    } else {
      this.clientSiteForm.markAllAsTouched();
    }
  }
}
