import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.scss"]
})
export class AddClientComponent implements OnInit {
  addClientForm: FormGroup;
  isUpdated = false;
  id:string;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiIntercepterService,
    private router: Router,
    private snackBar: MatSnackBar,
    public utils: UtilsService
  ) {
    this.addClientForm = this.fb.group({
      name: [null, Validators.required],
      client_id: [null, Validators.required],
      website: [null, Validators.required]
    });
  }

  submitForm() {
    if (this.addClientForm.valid) {
      if (!this.isUpdated) {
        this.apiService
          .post("accounts/clients/", this.addClientForm.value)
          .subscribe(value => {
            this.snackBar.open("Client Added", "successfully", {
              duration: 800
            });
            this.utils.internalDataBus.next({
              type: "update_client",
              data: this.addClientForm.value
            });
            this.router.navigate(["/clients"]);
          });
      } else {
        this.apiService
          .put(
            `accounts/clients/${this.id}/`,
            this.addClientForm.value
          )
          .subscribe(value => {
            this.snackBar.open("Client updated", "successfully", {
              duration: 800
            });
            this.router.navigate(["/clients"]);
          });
      }
    } else {
      this.addClientForm.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      this.addClientForm.patchValue({ client: user.id });
    });
    this.utils.internalDataBus.subscribe(deviceInfo => {
      if (deviceInfo && deviceInfo.type == "edit-client") {
        this.addClientForm.patchValue(deviceInfo.data);
        this.isUpdated = true;
        this.id=deviceInfo.data.id;
      }
    });
  }
}
