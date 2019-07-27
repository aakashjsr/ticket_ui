import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { UtilsService } from "../services/utils.service";
import { IclientSite } from '../utils/userInfo';

@Component({
  selector: "app-add-networks",
  templateUrl: "./add-networks.component.html",
  styleUrls: ["./add-networks.component.scss"]
})
export class AddNetworksComponent implements OnInit {
  networkForm: FormGroup;
  isUpdated = false;
  id: string;
  clientSites: IclientSite[] = [];
  clientName: Promise<string>;
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
      dns_server_ip: [null,],
      dc_name: [null,],
      domain_controller_ip: [null,],
      dhcp_name: [null,],
      lan_gateway: [null,],
      lan_subnet_mask: [null,],
      wan_ip: [null, Validators.required],
      wan_subnet_mask: [null, Validators.required],
      wan_gateway: [null, Validators.required],
      wan_speed: [null,],
      wan_ip_2: [null,],
      wan_subnet_mask_2: [null,],
      wan_speed_2: [null,],
      inactive_date: [],
      verified_date: [],
      client_site: [null, Validators.required],
      is_active: [true,]
    });
  }

  ngOnInit() {
    this.utils.internalDataBus.subscribe(value => {
      if (value && value.type == 'refresh_table') {
        this.networkForm.reset();
        this.isUpdated = false;
        this.networkForm.patchValue({ is_active: true });
      }
    });
    this.utils.currentUser.subscribe(client => {
      this.networkForm.patchValue({ client: client.id });
      this.clientName = new Promise((resolve, reject) => { resolve(client.name) });
    });
    this.utils.internalDataBus.subscribe(deviceInfo => {
      if (deviceInfo && deviceInfo.type == "edit-network") {
        this.networkForm.patchValue(deviceInfo.data);
        this.id = deviceInfo.data.id;
        this.isUpdated = true;
      }
    });

    this.utils.client_sites.subscribe((c_sites) => {
      if (c_sites) {
        console.log(c_sites);
        this.clientSites.push(...c_sites);
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
              duration: 3000
            });
            this.router.navigate(["/networks"]);
          });
      } else {
        this.apiService
          .put(
            `entities/networks/${this.id}/`,
            this.networkForm.value
          )
          .subscribe(value => {
            this.snackBar.open("Network updated", "Successfully", {
              duration: 3000
            });
            this.router.navigate(["/networks"]);
          });
      }
    } else {
      this.networkForm.markAllAsTouched();
    }
  }
}
