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
  client_name = '';
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private apiService: ApiIntercepterService,
    public utils: UtilsService
  ) {
    this.networkForm = this.fb.group({
      client: [],
      client_location: [null,],
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
    let pathParams = this.router.url.split("/");
    console.log(pathParams);
    if (pathParams.length == 3) {
      this.id = pathParams.pop();
      this.isUpdated = true;
      this.apiService.get(`entities/networks/${this.id}/`).subscribe((networks: any) => {
        this.networkForm.patchValue({ ...networks, client_site: networks.client_site.id });
        console.log(networks);
      });
    }

    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.client_name = user.name;
      this.apiService.get<IclientSite[]>("entities/client-sites/", { client: user.id })
        .subscribe(client_ites => this.clientSites = client_ites);
    });
  }

  submitForm() {
    if (this.networkForm.valid) {
      this.networkForm.patchValue({ client: JSON.parse(this.utils.getCookie('client'))['id'] });
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
