import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatCheckboxChange
} from "@angular/material";
import { ITicket, ICleientSites } from "../utils/userInfo";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { UtilsService } from "../services/utils.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ContactDialogueComponent } from "./contact-dialogue/contact-dialogue.component";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "tickets-table",
  templateUrl: "./tickets-table.component.html",
  styleUrls: ["./tickets-table.component.scss"]
})
export class TicketsTableComponent implements OnInit {
  displayedColumns: string[] = [
    "tktId",
    "status",
    'client',
    "cateogry",
    "desc",
    'assignedTo',
    // 'estComp',
    "c_p",
    "edit"
  ];
  dataSource: MatTableDataSource<ITicket> = new MatTableDataSource([]);
  networks: ITicket[] = [];
  filterForm: FormGroup;
  isActive = true;
  clients: Array<ICleientSites> = [];
  ticketStatus: Array<{ display: string; value: string }> = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apiService: ApiIntercepterService,
    private utils: UtilsService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      clients: [null],
      status: [null],
    });
  }

  getTicketById(id: any) {
    const clientName = this.clients.find((tkt => tkt.id == id));
    return clientName ? clientName.name : '';
  }

  activeFilter(event: MatCheckboxChange) {
    console.log(event);
    console.log(this.isActive);

    this.dataSource.filterPredicate =
      (data: ITicket, filter: any) => data && data.is_active && data.is_active.toString() == filter;
    this.dataSource.filter = this.isActive.toString();
  }

  openDialog(value: any): void {
    const dialogRef = this.dialog.open(ContactDialogueComponent, {
      width: "600px",
      maxWidth: "80vw",
      data: value
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
    });
  }

  getClients() {
    this.apiService
      .get<Array<ICleientSites>>("accounts/clients")
      .subscribe(value => {
        this.clients.push(...value);
        this.filterForm.patchValue({ clients: value.map(client => client.id) });
      });

    this.apiService
      .get<any[]>("entities/ticket/status/", {}, "json")
      .subscribe(value => {
        this.ticketStatus.push(...value);
        let tempTkt = [...value];
        tempTkt = tempTkt.filter(tickt => tickt.value !== 'completed')
        this.filterForm.patchValue({ status: tempTkt.map(status => status.value) });
      });
  }

  ngOnInit() {
    this.getClients();

    this.filterForm.valueChanges.subscribe(_ => {
      console.log(this.filterForm.value);
      let formData: { [key: string]: Array<string> } = this.filterForm.value;

      this.dataSource.filterPredicate = (data: ITicket, filter: any) => {
        console.log(data);
        if (typeof filter == 'string' || !filter) {
          return true;
        }
        const clients: Array<string> = filter.clients;
        const status: Array<string> = filter.status;
        if (!clients.length && !status.length) {
          return true;
        }

        let isClient = false;
        let isStatus = false;


        clients.forEach(clientId => {
          if (data.client.toString().toLowerCase() == clientId.toString().toLowerCase()) {
            isClient = true;
          }
        });

        status.forEach(value => {
          if (data.status.toLowerCase() == value.toLowerCase()) {
            isStatus = true;
          }
        });
        return isClient && isStatus;
      };

      this.dataSource.filter = <any>formData;
    });
    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.createNewUser(user.id).subscribe(networks => {
        this.networks = networks;
        this.dataSource = new MatTableDataSource(this.networks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: ITicket, filter: string) => data.status !== filter;
        this.dataSource.filter = 'completed';
      });
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editTktDetails(selectedTkt: any) {
    this.router.navigate(["/ticket"]);
    this.utils.internalDataBus.next({
      type: "tkt",
      data: {
        ...selectedTkt,
        client: selectedTkt.client.id, assigned_to: selectedTkt.assigned_to.id
      },
    });
  }

  createNewUser(id: any): Observable<ITicket[]> {
    return this.apiService.get<ITicket[]>("entities/tickets/", { client: id });
  }
}
