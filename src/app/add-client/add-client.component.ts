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
  id: string;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiIntercepterService,
    private router: Router,
    private snackBar: MatSnackBar,
    public utils: UtilsService
  ) {
    this.addClientForm = this.fb.group({
      name: [null, Validators.required],
      website: [null, Validators.required],
      is_active: [true]
    });
  }

  submitForm() {
    if (this.addClientForm.valid) {
      if (!this.isUpdated) {
        this.apiService
          .post("accounts/clients/", this.addClientForm.value)
          .subscribe(value => {
            this.utils.internalDataBus.next({ type: 'get_client', data: null });
            this.router.navigate(["/clients"]);
            this.snackBar.open("Client Added", "successfully", {
              duration: 800
            });
          });
      } else {
        this.apiService
          .put(`accounts/clients/${this.id}/`, this.addClientForm.value)
          .subscribe(value => {
            this.utils.internalDataBus.next({ type: 'get_client', data: null });
            this.router.navigate(["/clients"]);
            this.snackBar.open("Client updated", "successfully", {
              duration: 800
            });
          });
      }
    } else {
      this.addClientForm.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.addClientForm.patchValue({ is_active: true });
    let urlParams = this.router.url.split("/");
    if (urlParams.length == 3) {
      this.id = urlParams.pop();
      console.log(this.id);
      this.isUpdated = true;
      this.apiService.get(`accounts/clients/${this.id}/`).subscribe((client => {
        console.log(client);
        this.addClientForm.patchValue(client)
      }));
    }
  }
}
