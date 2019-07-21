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
  id: string;
  deviceTypes = ['Router', 'Access', 'Point', 'phone', 'IOT', 'Printer', 'Switch',
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
      user_id: [null, Validators.required],
      type: [null, Validators.required],
      wan_ip: [null,],
      make: [null,],
      username: [null,],
      password: [null,],
      device_id: [null,],
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
      client_site: [null,],
      verified_date: [],
      notes: [],
      is_active: []
    });
  }

  ngOnInit() {
    this.deviceForm.reset();
    this.utils.internalDataBus.subscribe(value => {
      if (value && value.type == 'refresh_table') {
        this.deviceForm.reset();
        this.isUpdated = false;
      }
    });
    this.deviceForm.patchValue({ client: this.utils.currentUser.value.id });
    this.utils.internalDataBus.subscribe(deviceInfo => {
      if (deviceInfo && deviceInfo.type == "edit-device") {
        this.deviceForm.patchValue(deviceInfo.data);
        this.isUpdated = true;
        this.id = deviceInfo.data.id;
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
    if (this.deviceForm.valid) {
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
