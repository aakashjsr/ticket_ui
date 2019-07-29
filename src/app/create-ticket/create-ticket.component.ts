import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: "create-ticket",
  templateUrl: "./create-ticket.component.html",
  styleUrls: ["./create-ticket.component.scss"]
})
export class CreateTicketComponent implements OnInit {
  ticketsCat: Array<{ display: string; value: string }> = [];
  ticketForm: FormGroup;
  isUpdate = false;
  client_name = '';
  stateCtrl = new FormControl();
  ticketStatus: Array<{ display: string; value: string }> = [];
  usersList: any[];
  currentTktHistory = [];
  updateTicketId: number;
  workType: Array<string> = ['Onsite', 'Offsite', 'Project', 'After', 'Hours', 'Onsite', 'After', 'Hours', 'offsite']

  constructor(
    public apiService: ApiIntercepterService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    public utils: UtilsService
  ) {
    this.intiForm();
  }

  disableFields() {
    this.ticketForm.controls['category'].disable();
    this.ticketForm.controls['invoice_id'].disable();
    this.ticketForm.controls['work_type'].disable();
    this.ticketForm.controls['parts_used'].disable();
    // this.ticketForm.controls['requested_comp_date'].disable();
    this.ticketForm.controls['description'].disable();
    this.ticketForm.controls['category'].disable();
    let currentRole = this.utils.getCookie('user_type');
    if (currentRole !== 'admin' && currentRole !== 'global_admin') {
      this.ticketForm.controls['assigned_to'].disable();
      this.ticketForm.controls['contact_person'].disable();
    }
    console.log(this.ticketForm.value);
  }


  intiForm() {
    this.ticketForm = this.fb.group({
      category: [null, Validators.required],
      status: ["new", Validators.required],
      invoice_id: [null,],
      parts_used: [null,],
      contact_person: [null, Validators.required],
      assigned_to: [null, Validators.required],
      public_notes: [null,],
      internal_notes: [null],
      description: [null, Validators.required],
      client: [null],
      work_type: [null, Validators.required],
    });
  }

  ngOnInit() {
    console.log(this.router.url);

    this.apiService.get<any[]>("entities/ticket/status/", {}, "json").subscribe((value) => this.ticketStatus = value);
    this.apiService.getTktCateogries().subscribe((tktCat) => this.ticketsCat.push(...tktCat));


    this.utils.currentUser.subscribe(user => {
      if (user && !this.ticketForm.value.client) {
        this.client_name = user.name;
        this.apiService
          .get("accounts/client-users/", { client: user.id })
          .subscribe((value: any) => {
            this.usersList = value;
          });

        const urlSegment = this.router.url.split('/');
        if (urlSegment.length == 3) {
          console.log('entering update mode', urlSegment);

          this.updateTicketId = + urlSegment.pop();
          if (this.updateTicketId) {
            this.isUpdate = true;
            this.apiService
              .get(`entities/ticket/${this.updateTicketId}/`)
              .subscribe((value: any) => {
                console.log(value, '---------------getTkt--------------------');
                let patchableValue = { ...value, assigned_to: value.assigned_to.id, client: value.client.id, contact_person: value.contact_person.id };
                console.log(patchableValue);
                this.ticketForm.patchValue(patchableValue);
                this.disableFields();
                this.apiService
                  .get<Array<any>>(`entities/ticket-history/${patchableValue.id}/`)
                  .subscribe(history => {
                    this.currentTktHistory = history;
                  });
              });
          }
        }
      }

    });
  }

  submitForm() {
    if (this.ticketForm.valid) {
      const payload = { ...this.ticketForm.value, client: JSON.parse(this.utils.getCookie('client'))['id'] }
      console.log(payload);
      if (this.isUpdate) {
        this.apiService
          .put(`entities/ticket/${this.updateTicketId}/`, payload)
          .subscribe(value => {
            this.snackBar.open("Ticket updated", "SuccessFully", {
              duration: 3000
            });
            this.router.navigate(["/"]);
          });
      } else {
        this.apiService
          .post("entities/tickets/", payload)
          .subscribe(value => {
            this.snackBar.open("Ticket Created", "SuccessFully", {
              duration: 3000
            });
            this.router.navigate(["/"]);
          });
      }
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }
}
