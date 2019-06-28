import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ITicket } from '../utils/userInfo';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { UtilsService } from '../services/utils.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.scss']
})
export class TicketsTableComponent implements OnInit {
  displayedColumns: string[] = ['gateway', 'wan_ip', 'dhcp_name', 'dns_server_ip', 'domain_controller_ip', 'estComp'];
  dataSource: MatTableDataSource<ITicket>;
  networks: ITicket[] = [];

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: true }) sort: MatSort;

  constructor(private apiService: ApiIntercepterService, private utils: UtilsService) {
  }

  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.createNewUser(user.id).subscribe((networks) => {
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


  createNewUser(id: any): Observable<ITicket[]> {
    return this.apiService.get<ITicket[]>("entities/tickets", { client: id })
  }

}