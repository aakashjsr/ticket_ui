import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: "app-add-networks",
  templateUrl: "./add-networks.component.html",
  styleUrls: ["./add-networks.component.scss"]
})
export class AddNetworksComponent implements OnInit {
  networkForm: FormGroup;
  isUpdated = false;
  id:string;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private apiService: ApiIntercepterService,
    public utils: UtilsService
  ) {
    this.networkForm = this.fb.group({
      client: [],
      client_location: [null, Validators.required],
      dns_server_ip: [null, Validators.required],
      dc_name: [null, Validators.required],
      domain_controller_ip: [null, Validators.required],
      dhcp_name: [null, Validators.required],
      lan_gateway: [null, Validators.required],
      lan_subnet_mask: [null, Validators.required],
      wan_ip: [null, Validators.required],
      wan_subnet_mask: [null, Validators.required],
      wan_gateway: [],
      wan_speed: [null, Validators.required],
      wan_ip_2: [null, Validators.required],
      wan_subnet_mask_2: [null, Validators.required],
      wan_speed_2: [null, Validators.required],
      inactive_date: [],
      verified_date: []
    });
  }

  ngOnInit() {
    this.networkForm.patchValue({ client: this.utils.currentUser.value.id });
    this.utils.internalDataBus.subscribe(deviceInfo => {
      if (deviceInfo && deviceInfo.type == "edit-network") {
        this.networkForm.patchValue(deviceInfo.data);
        this.id=deviceInfo.data.id;
        this.isUpdated = true;
      }
    });
  }

  submitForm() {
    if (this.networkForm.valid) {
      if (!this.isUpdated) {
        this.apiService
          .post("entities/networks/", this.networkForm.value)
          .subscribe(value => {
            this.snackBar.open("Network Added", "Successfully", {
              duration: 1000
            });
            this.router.navigate(["/networks"]);
          });
      }else {
        this.apiService
          .put(
            `entities/networks/${this.id}/`,
            this.networkForm.value
          )
          .subscribe(value => {
            this.snackBar.open("Network updated", "Successfully", {
              duration: 1000
            });
            this.router.navigate(["/networks"]);
          });
      }
    } else {
      this.networkForm.markAllAsTouched();
    }
  }
}
