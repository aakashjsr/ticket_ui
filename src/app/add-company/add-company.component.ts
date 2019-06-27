import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import * as momentTimeZone from 'moment-timezone';
let countryData = require('country-data');
declare var require: any;



@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  timezones: Array<string> = (<any> momentTimeZone).tz.names();
  states: [
    { code: 'AP', name: 'Andhra Pradesh' },
    { code: 'AR', name: 'Arunachal Pradesh' },
    { code: 'AS', name: 'Assam' },
    { code: 'BR', name: 'Bihar' },
    { code: 'CT', name: 'Chhattisgarh' },
    { code: 'GA', name: 'Goa' },
    { code: 'GJ', name: 'Gujarat' },
    { code: 'HR', name: 'Haryana' },
    { code: 'HP', name: 'Himachal Pradesh' },
    { code: 'JK', name: 'Jammu & Kashmir' },
    { code: 'JH', name: 'Jharkhand' },
    { code: 'KA', name: 'Karnataka' },
    { code: 'KL', name: 'Kerala' },
    { code: 'MP', name: 'Madhya Pradesh' },
    { code: 'MH', name: 'Maharashtra' },
    { code: 'MN', name: 'Manipur' },
    { code: 'ML', name: 'Meghalaya' },
    { code: 'MZ', name: 'Mizoram' },
    { code: 'NL', name: 'Nagaland' },
    { code: 'OR', name: 'Odisha' },
    { code: 'PB', name: 'Punjab' },
    { code: 'RJ', name: 'Rajasthan' },
    { code: 'SK', name: 'Sikkim' },
    { code: 'TN', name: 'Tamil Nadu' },
    { code: 'TR', name: 'Tripura' },
    { code: 'UK', name: 'Uttarakhand' },
    { code: 'UP', name: 'Uttar Pradesh' },
    { code: 'WB', name: 'West Bengal' },
    { code: 'AN', name: 'Andaman & Nicobar' },
    { code: 'CH', name: 'Chandigarh' },
    { code: 'DN', name: 'Dadra and Nagar Haveli' },
    { code: 'DD', name: 'Daman & Diu' },
    { code: 'DL', name: 'Delhi' },
    { code: 'LD', name: 'Lakshadweep' },
    { code: 'PY', name: 'Puducherry' }
  ]
  constructor(private fb: FormBuilder,
    private router: Router,
    private apiService: ApiIntercepterService
  ) {
    this.companyForm = this.fb.group({
      name: [],
      address_line1: [],
      address_line2: [],
      city: [],
      state: ["JK"],
      zip_code: [],
      phone: [],
      fax: [],
      website: [],
      isActive: [true],
      business_hours: [],
      time_zone: [],
      expires_date: [],
    });
  }

  ngOnInit() {
    console.log(momentTimeZone.tz.guess());
    this.companyForm.patchValue({
      time_zone: momentTimeZone.tz.guess()
    });
    console.log(countryData.countries.all);
    console.log(countryData.regions.all);
  }


  submitForm() {
    if (this.companyForm.valid) {
      console.log(this.companyForm.value);

    }
  }

}
