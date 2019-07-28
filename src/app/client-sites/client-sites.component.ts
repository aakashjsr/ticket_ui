import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatCheckboxChange } from '@angular/material';
import { IclientSite } from '../utils/userInfo';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { Observable } from 'rxjs';
import { UtilsService } from '../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-sites',
  templateUrl: './client-sites.component.html',
  styleUrls: ['./client-sites.component.scss']
})
export class ClientSitesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'addr1', 'city', 'zip', 'state', 'phone', 'vWeb', 'hours', 'edit'];
  dataSource: MatTableDataSource<IclientSite>;
  clientSites = [];
  isActive = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private apiService: ApiIntercepterService
    , private utils: UtilsService
    , private router: Router) {

  }

  editUserForm(value: any) {
    this.router.navigate([`edit-client-site/${value.id}`]);
  }


  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      this.apiService.get<IclientSite[]>("entities/client-sites/", { client: JSON.parse(this.utils.getCookie('client')).id })
        .subscribe(client_ites => {
          this.clientSites = client_ites
          console.log(client_ites);
          this.dataSource = new MatTableDataSource(this.clientSites);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.activeFilter();
        });
    });


  }


  activeFilter(event?: MatCheckboxChange) {
    console.log(event);

    this.dataSource.filterPredicate = (data: IclientSite, filter: any) => data && data.is_active.toString() == filter;
    this.dataSource.filter = this.isActive.toString();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
