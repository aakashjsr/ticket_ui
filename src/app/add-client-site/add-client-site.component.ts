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
      client: [null],
      address_line_1: [null, Validators.required],
      address_line_2: [],
      city: [null, Validators.required],
      client_location: [],
      zip_code: [null, Validators.required],
      state: [null, Validators.required],
      phone: [null, Validators.required],
      fax: [],
      client_hours: [],
      is_active: [true]
    });
  }
  // edit-client-site
  ngOnInit() {
    this.clientSiteForm.patchValue({ is_active: true });
    let urlParams = this.router.url.split("/");
    if (urlParams.length == 3) {
      this.id = urlParams.pop();
      this.isUpdated = true;
      this.apiService.get(`entities/client-sites/${this.id}/`).subscribe((c_site) => {
        this.clientSiteForm.patchValue(c_site);
      });
    } else {
      this.isUpdated = false;
    }
  }

  submitForm() {
    if (this.clientSiteForm.valid) {
      this.clientSiteForm.patchValue({ client: JSON.parse(this.utils.getCookie('client'))['id'] });
      if (!this.isUpdated) {
        this.apiService
          .post("entities/client-sites/", this.clientSiteForm.value)
          .subscribe(value => {
            this.snackBar.open("Client Site Added", "Successfully", {
              duration: 3000
            });
            this.utils.internalDataBus.next({ type: 'get_client_site', data: null });
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
              duration: 3000
            });
            this.utils.internalDataBus.next({ type: 'get_client_site', data: null });
            this.router.navigate(["/client_sites"]);
          });
      }
    } else {
      this.clientSiteForm.markAllAsTouched();
    }
  }
}
