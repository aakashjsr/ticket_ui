import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ApiIntercepterService } from '../../services/api-intercepter.service';
import { Observable } from 'rxjs';
import { INetwork } from '../../utils/userInfo';
import { UtilsService } from '../../services/utils.service';


@Component({
  selector: 'network-table',
  templateUrl: './network-table.component.html',
  styleUrls: ['./network-table.component.scss']
})
export class NetworkTableComponent implements OnInit {
  displayedColumns: string[] = ['site', 'gateway', 'wan_ip', 'dhcp_name', 'dns_server_ip', 'domain_controller_ip'];
  dataSource: MatTableDataSource<INetwork>;
  networks: INetwork[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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


  createNewUser(id: any): Observable<INetwork[]> {
    return this.apiService.get<INetwork[]>("entities/networks/", { client: id })
  }

}
