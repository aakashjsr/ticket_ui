import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { ITicket, ICleientSites } from "../utils/userInfo";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { UtilsService } from "../services/utils.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ContactDialogueComponent } from "./contact-dialogue/contact-dialogue.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "tickets-table",
  templateUrl: "./tickets-table.component.html",
  styleUrls: ["./tickets-table.component.scss"]
})
export class TicketsTableComponent implements OnInit {
  displayedColumns: string[] = [
    "gateway",
    "wan_ip",
    "dhcp_name",
    "dns_server_ip",
    "domain_controller_ip",
    "edit"
  ];
  dataSource: MatTableDataSource<ITicket>;
  networks: ITicket[] = [];
  filterForm: FormGroup;
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
      clients: [["all"], Validators.required],
      status: [["all"], Validators.required]
    });
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
      });

    this.apiService
      .get<any[]>("entities/ticket/status/", {}, "json")
      .subscribe(value => {
        this.ticketStatus.push(...value);
      });
  }

  ngOnInit() {
    this.getClients();

    this.filterForm.valueChanges.subscribe(_ => {
      console.log(this.filterForm.value);
      let formData: { [key: string]: Array<string> } = this.filterForm.value;

      this.dataSource.filterPredicate = (data: ITicket, filter: any) => {
        console.log(filter);
        const clients: Array<string> = filter.clients.filter(
          (value: any) => value !== "all"
        );
        const status: Array<string> = filter.status.filter(
          (value: any) => value !== "all"
        );

        console.log(clients, status);
        let ispresent = false;
        if (!clients.length && !status.length) {
          ispresent = true;
        }
        clients.forEach(clientId => {
          if (data.client.toString() == clientId.toString()) {
            ispresent = true;
          }
        });

        status.forEach(value => {
          if (data.status.toString() == value.toString()) {
            ispresent = true;
          }
        });
        return ispresent;
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
    this.utils.internalDataBus.next({ type: "tkt", data: selectedTkt });
  }

  createNewUser(id: any): Observable<ITicket[]> {
    return this.apiService.get<ITicket[]>("entities/tickets", { client: id });
  }
}
