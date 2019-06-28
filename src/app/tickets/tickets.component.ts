import { Component, OnInit } from '@angular/core';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { IClient } from '../utils/userInfo';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  clients: IClient[] = [];
  selectedClient = new FormControl();
  currentStatus = new FormControl();
  tktStatus: Array<{
    display: string,
    id: number,
    value: string
  }> = [];

  ticketsTableData = [];
  constructor(
    private apiService: ApiIntercepterService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }


  getClientTickets(id: any) {
    this.apiService.get<any>("entities/tickets", { client: id }).subscribe(value => {
      this.ticketsTableData = value;
    });
  }


  ngOnInit() {
    this.apiService.get<any>("accounts/clients").subscribe((value) => {
      this.clients = value;
      this.selectedClient.patchValue(this.clients[0]);
    });

    this.selectedClient.valueChanges.subscribe((value) => {
      console.log(this.selectedClient.value);
    });

    this.selectedClient.valueChanges.subscribe((value) => {
      console.log(this.selectedClient.value);
    });

    this.apiService.get<any>("entities/ticket/status").subscribe((value) => {
      this.tktStatus = value;
      this.currentStatus.patchValue(this.tktStatus[0]);
    });
  }

}
