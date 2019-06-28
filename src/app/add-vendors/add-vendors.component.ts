import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-add-vendors',
  templateUrl: './add-vendors.component.html',
  styleUrls: ['./add-vendors.component.scss']
})
export class AddVendorsComponent implements OnInit {
  vendorForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private apiService: ApiIntercepterService,
    public utils: UtilsService
  ) {
    this.vendorForm = this.fb.group({
      client: [],
      name: [],
      phone: [],
      email: [],
      address: [],
      service: [],
      website: [],
      support_website: [],
      verified_date: [],
      notes: []
    });
  }

  ngOnInit() {
    this.vendorForm.patchValue({ client: this.utils.currentUser.value.id });
  }

  submitForm() {
    this.apiService.post("entities/vendors/", this.vendorForm.value).subscribe((value) => {
      this.snackBar.open("vendor added", "Successfully", { duration: 1000 });
      this.router.navigate(["/"]);
    });
  }
}
