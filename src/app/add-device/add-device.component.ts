import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: "app-add-device",
  templateUrl: "./add-device.component.html",
  styleUrls: ["./add-device.component.scss"]
})
export class AddDeviceComponent implements OnInit {
  deviceForm: FormGroup;
  isUpdated = false;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiIntercepterService,
    private snackBar: MatSnackBar,
    public utils: UtilsService,
    private router: Router
  ) {
    this.deviceForm = this.fb.group({
      client: [null, Validators.required],
      user_id: [null, Validators.required],
      type: [null, Validators.required],
      wan_ip: [null, Validators.required],
      make: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      device_id: [null, Validators.required],
      serial: [null, Validators.required],
      warranty_exp: [null, Validators.required],
      processor: [null, Validators.required],
      ram: [null, Validators.required],
      lan_ip: [null, Validators.required],
      bit: [null, Validators.required],
      deactivation_date: [],
      location: [null, Validators.required],
      mac_address: [null, Validators.required],
      wireless_ssid: [null, Validators.required],
      wireless_pass: [null, Validators.required],
      guest_ssid: [null, Validators.required],
      guest_pass: [null, Validators.required],
      guest_dhcp: [null, Validators.required],
      backup: [null, Validators.required],
      verified_date: [],
      notes: []
    });
  }

  ngOnInit() {
    this.deviceForm.patchValue({ client: this.utils.currentUser.value.id });
    this.utils.internalDataBus.subscribe(deviceInfo => {
      if (deviceInfo && deviceInfo.type == "edit-device") {
        this.deviceForm.patchValue(deviceInfo.data);
        this.isUpdated = true;
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
              duration: 1000
            });
            this.router.navigate(["/devices"]);
          });
      } else {
        this.apiService
          .put(
            `entities/devices/${this.deviceForm.value.client}/`,
            this.deviceForm.value
          )
          .subscribe(value => {
            this.snackBar.open("Device updated", "Successfully", {
              duration: 1000
            });
            this.router.navigate(["/devices"]);
          });
      }
    } else {
      this.deviceForm.markAllAsTouched();
    }
  }
}
