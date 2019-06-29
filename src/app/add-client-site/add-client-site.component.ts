import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-add-client-site',
  templateUrl: './add-client-site.component.html',
  styleUrls: ['./add-client-site.component.scss']
})
export class AddClientSiteComponent implements OnInit {
  clientSiteForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    public utils: UtilsService,
    private apiService: ApiIntercepterService) {
    this.clientSiteForm = this.fb.group({
      name: [],
      client: [],
      address_line_1: [],
      address_line_2: [],
      city: [],
      client_location: [],
      zip_code: [],
      state: [],
      phone: [],
      fax: [],
      website: [],
      client_hours: [],
      is_active: []
    });
  }

  ngOnInit() {
    this.clientSiteForm.patchValue({ client: this.utils.currentUser.value.id });
  }

  submitForm() {
    this.apiService.post("entities/client-sites", this.clientSiteForm.value).subscribe((value) => {
      this.snackBar.open("Client Site Added", "Successfully", { duration: 1000 });
      this.router.navigate(["/"]);
    });
  }
}
