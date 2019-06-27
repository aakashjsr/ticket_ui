import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ApiIntercepterService } from '../../services/api-intercepter.service';
import { Observable } from 'rxjs';
import { INetwork } from '../../utils/userInfo';


@Component({
  selector: 'network-table',
  templateUrl: './network-table.component.html',
  styleUrls: ['./network-table.component.scss']
})
export class NetworkTableComponent implements OnInit {
  displayedColumns: string[] = ['site', 'gateway', 'wan_ip', 'dhcp_name', 'dns_server_ip', 'domain_controller_ip'];
  dataSource: MatTableDataSource<INetwork>;
  networks: INetwork[] = [];
  @Input('id') set clientId(id: number) {
    this.createNewUser(id).subscribe((networks) => {
      this.networks = networks;
      this.dataSource = new MatTableDataSource(this.networks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: true }) sort: MatSort;

  constructor(private apiService: ApiIntercepterService) {
  }

  ngOnInit() {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  createNewUser(id: number): Observable<INetwork[]> {
    return this.apiService.get<INetwork[]>("entities/networks", { client: id })
  }

}
