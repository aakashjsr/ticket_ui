import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { UtilsService } from "../services/utils.service";
import { IclientSite } from '../utils/userInfo';

@Component({
  selector: "app-add-device",
  templateUrl: "./add-device.component.html",
  styleUrls: ["./add-device.component.scss"]
})
export class AddDeviceComponent implements OnInit {
  deviceForm: FormGroup;
  isUpdated = false;
  clientSites: IclientSite[] = [];
  client_name = '';
  id: string;
  deviceTypes = ['Router', 'Access point', 'phone', 'IOT', 'Printer', 'Switch',
    'firewall', 'server', 'workstation', 'mac', 'ups', 'modem', 'NAS',
    'Camera', 'software', 'VM', 'Phone', 'system'];
  constructor(
    private fb: FormBuilder,
    private apiService: ApiIntercepterService,
    private snackBar: MatSnackBar,
    public utils: UtilsService,
    private router: Router
  ) {
    this.deviceForm = this.fb.group({
      client: [null,],
      user_id: [null],
      type: [null, Validators.required],
      wan_ip: [null,],
      make: [null,],
      username: [null,],
      password: [null,],
      device_id: [null, Validators.required],
      serial: [null,],
      warranty_exp: [null,],
      processor: [null,],
      ram: [null,],
      lan_ip: [null,],
      bit: [null,],
      deactivation_date: [],
      location: [null,],
      mac_address: [null,],
      wireless_ssid: [null,],
      wireless_pass: [null,],
      guest_ssid: [null,],
      guest_pass: [null,],
      guest_dhcp: [null,],
      backup: [null,],
      client_site: [null, Validators.required],
      verified_date: [],
      notes: [],
      is_active: [true]
    });
  }

  ngOnInit() {
    let paths = this.router.url.split("/");
    console.log(paths);
    if (paths.length == 3) {
      this.apiService.get<any>(`entities/devices/${paths.pop()}/`).subscribe((deviceInfo) => {
        console.log(deviceInfo);
        let info = { ...deviceInfo, client: deviceInfo.client.id, client_site: deviceInfo.client_site.id };
        this.deviceForm.patchValue(info);
        console.log(info);

        this.isUpdated = true;
        this.id = deviceInfo.id;
      });
    }
    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.client_name = user.name;

      this.apiService.get<IclientSite[]>("entities/client-sites/", { client: user.id })
        .subscribe(client_ites => {
          this.clientSites = client_ites;
        });
    });
  }

  submitForm() {
    if (this.deviceForm.valid) {
      this.deviceForm.patchValue({ client: JSON.parse(this.utils.getCookie('client'))['id'] })
      if (!this.isUpdated) {
        this.apiService
          .post("entities/devices/", this.deviceForm.value)
          .subscribe(value => {
            this.snackBar.open("Device Added", "Successfully", {
              duration: 3000
            });
            this.router.navigate(["/devices"]);
          });
      } else {
        this.apiService
          .put(
            `entities/devices/${this.id}/`,
            this.deviceForm.value
          )
          .subscribe(value => {
            this.snackBar.open("Device updated", "Successfully", {
              duration: 3000
            });
            this.router.navigate(["/devices"]);
          });
      }
    } else {
      this.deviceForm.markAllAsTouched();
    }
  }
}
