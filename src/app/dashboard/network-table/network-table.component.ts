import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatCheckboxChange } from '@angular/material';
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
    ['site', 'wan_ip', 'sub_mask', 'gateway', 'dhcp_name', 'verified_date', 'edit'];
  dataSource: MatTableDataSource<INetwork>;
  networks: INetwork[] = [];
  isActive = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private apiService: ApiIntercepterService
    , private utils: UtilsService
    , private router: Router) {
  }

  editUserForm(value: INetwork) {
    this.router.navigate([`edit-network/${value.id}`]);
  }

  activeFilter(event: MatCheckboxChange) {
    console.log(event);
    this.dataSource.filterPredicate = (data: INetwork, filter: any) => data && data.is_active.toString() == filter;
    this.dataSource.filter = this.isActive.toString();
  }


  ngOnInit() {

    this.createNewUser(JSON.parse(this.utils.getCookie('client'))['id']).subscribe((networks) => {
      this.networks = networks;
      this.dataSource = new MatTableDataSource(this.networks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
