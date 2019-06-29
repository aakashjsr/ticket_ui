import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';




@Component({
  selector: 'create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  ticketsCat: Array<{ display: string, value: string }> = [];
  ticketForm: FormGroup;
  isUpdate = false;
  stateCtrl = new FormControl();
  ticketStatus: Array<{ display: string, value: string }> = [];
  usersList: any[];
  currentTktHistory = [];


  constructor(
    public apiService: ApiIntercepterService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    public utils: UtilsService
  ) {
    this.ticketForm = this.fb.group({
      category: [null,],
      status: [null,],
      invoice_id: [null,],
      parts_used: [null,],
      requested_comp_date: [null,],
      completed_time: [],
      submit_time: [null],
      contact_person: [null,],
      assigned_to: [null,],
      public_notes: [null],
      client: [null, Validators.required],
    });
    this.utils.internalDataBus.subscribe(value => {
      if (!value) return;
      console.log(value);
      if (value.type == 'tkt') {
        this.isUpdate = true;
        this.ticketForm.patchValue(value.data);
        this.apiService.get<Array<any>>(`entities/ticket-history/${value.data.id}/`).subscribe(history => {
          this.currentTktHistory = history;
        })
      }
    });

  }


  ngOnInit() {
    this.apiService.getTktCateogries().subscribe(value => {
      this.ticketsCat.push(...value)
    });

    this.apiService.get<any[]>("entities/ticket/status/", {}, 'json').subscribe(value => {
      this.ticketStatus = value;
    });

    this.apiService.get("accounts/client-users", { client: 1 }).subscribe((value: any) => {
      console.log(value, "---------------------------------------------------------------");
      this.usersList = value;
    });
    this.utils.currentUser.subscribe(user => {
      if (user && !this.ticketForm.value.client) {
        this.ticketForm.patchValue({ client: user.id });
      }
    });

  }


  submitForm() {
    if (this.ticketForm.valid) {
      this.apiService.post("entities/tickets/", this.ticketForm.value).subscribe(value => {
        this.snackBar.open("Ticket Created", "SuccessFully", { duration: 1000 });
        this.router.navigate(["/"]);
      })
    }
  }

}
