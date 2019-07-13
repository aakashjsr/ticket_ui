import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ApiIntercepterService } from '../../services/api-intercepter.service';
import { Observable } from 'rxjs';
import { INetwork } from '../../utils/userInfo';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';


@Component({
  selector: 'network-table',
  templateUrl: './network-table.component.html',
  styleUrls: ['./network-table.component.scss']
})
export class NetworkTableComponent implements OnInit {
  displayedColumns: string[] =
  ['site', 'gateway', 'wan_ip', 'dhcp_name', 'dns_server_ip', 'domain_controller_ip', 'edit'];
  dataSource: MatTableDataSource<INetwork>;
  networks: INetwork[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private apiService: ApiIntercepterService
    , private utils: UtilsService
    , private router:Router) {
  }

  editUserForm(value:any){
    this.utils.internalDataBus.next({type:'edit-network',data:value})
    this.router.navigate(['network']);
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
