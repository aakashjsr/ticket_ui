import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  deviceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiIntercepterService,
    private snackBar: MatSnackBar,
    public utils: UtilsService,
    private router: Router) {
    this.deviceForm = this.fb.group({
      client: [],
      user_id: [],
      type: [],
      wan_ip: [],
      make: [],
      username: [],
      password: [],
      serial: [],
      warranty_exp: [],
      processor: [],
      ram: [],
      bit: [],
      deactivation_date: [],
      location: [],
      mac_address: [],
      wireless_ssid: [],
      wireless_pass: [],
      guest_ssid: [],
      guest_password: [],
      guest_dhcp: [],
      backup: [],
      verified_date: [],
      notes: []
    });
  }

  ngOnInit() {
    this.deviceForm.patchValue({ client: this.utils.currentUser.value.id })
  }

  submitForm() {
    this.apiService.post("entities/devices/", this.deviceForm.value).subscribe((value) => {
      this.snackBar.open("Device Added", "Successfully", { duration: 1000 });
      this.router.navigate(["/"]);
    });
  }
}
