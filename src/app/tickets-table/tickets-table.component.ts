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
import { debounceTime } from 'rxjs/operators';

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
      clients: [[]],
      status: [[]],
    });
  }

  getTicketById(id: any) {
    const clientName = this.clients.find((tkt => tkt.id == id));
    return clientName ? clientName.name.split('_').join(' ') : '';
  }

  get firststatus() {
    let firsttkt = this.ticketStatus.find((tkt) => tkt.value == this.filterForm.value.status[0]);
    if (firsttkt) {
      return firsttkt.value.split('_').join(' ');
    }
    return '';
  }

  activeFilter(event?: MatCheckboxChange) {
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
    this.utils.clients
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

    this.filterForm.valueChanges.pipe(debounceTime(10)).subscribe(_ => {
      console.log(this.filterForm.value);
      let formData: { [key: string]: Array<string> } = this.filterForm.value;
      const networks = this.networks.filter((network) => {
        return formData['clients'].find((client) => {
          return client == network.client.id
        }) && formData['status'].find((status) => {
          return status == network.status
        });
      });

      this.dataSource = new MatTableDataSource(networks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.utils.currentUser.pipe(debounceTime(600)).subscribe((user) => {
      if (!user) return;
      this.createNewUser(user.id).subscribe(networks => {
        this.networks = networks;
        this.dataSource = new MatTableDataSource(this.networks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: ITicket, filter: string) => data.status !== filter;
        this.dataSource.filter = 'completed';
        this.activeFilter();

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
    this.router.navigate([`edit-ticket/${selectedTkt.id}`]);
  }

  createNewUser(id: any): Observable<ITicket[]> {
    return this.apiService.get<ITicket[]>("entities/tickets/", { client: id });
  }
}
