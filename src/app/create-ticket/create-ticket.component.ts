import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


export interface State {
  flag: string;
  name: string;
  population: string;
}



@Component({
  selector: 'create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  ticketsCat: Array<{ display: string, value: string }> = [];
  ticketForm: FormGroup;
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  ticketStatus: Array<{ display: string, value: string }> = [];
  usersList: any[];


  constructor(
    public apiService: ApiIntercepterService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.ticketForm = this.fb.group({
      category: [null, Validators.required],
      status: [null, Validators.required],
      invoice_id: [null, Validators.required],
      parts_used: [null, Validators.required],
      requested_comp_date: [null, Validators.required],
      estimated_comp_date: [null, Validators.required],
      contact_person: [null, Validators.required],
      assigned_to: [null, Validators.required],
      issue_description: [null, Validators],
      client_id: [Validators.required],
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
