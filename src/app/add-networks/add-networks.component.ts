import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-add-networks',
  templateUrl: './add-networks.component.html',
  styleUrls: ['./add-networks.component.scss']
})
export class AddNetworksComponent implements OnInit {
  networkForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private apiService: ApiIntercepterService,
    public utils: UtilsService
  ) {
    this.networkForm = this.fb.group({
      client: [],
      client_location: [],
      dns_server_ip: [],
      dc_name: [],
      domain_controller_ip: [],
      dhcp_name: [],
      lan_gateway: [],
      lan_subnet_mask: [],
      wan_ip: [],
      wan_subnet_mask: [],
      wan_gateway: [],
      wan_speed: [],
      wan_ip_2: [],
      wan_subnet_mask_2: [],
      wan_speed_2: [],
      inactive_date: [],
      verified_date: [],
    });
  }

  ngOnInit() {
    this.networkForm.patchValue({ client: this.utils.currentUser.value.id });
  }

  submitForm() {
    this.apiService.post("entities/networks/", this.networkForm.value).subscribe((value) => {
      this.snackBar.open("Network Added", "Successfully", { duration: 1000 });
      this.router.navigate(["/networks"]);
    });
  }

}
