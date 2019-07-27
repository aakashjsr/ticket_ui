import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatCheckboxChange } from '@angular/material';
import { IclientSite } from '../utils/userInfo';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { UtilsService } from '../services/utils.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'website', 'edit'];
  dataSource: MatTableDataSource<IclientSite>;
  clientSites = [];
  isActive = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apiService: ApiIntercepterService
    , private utils: UtilsService
    , private cdref: ChangeDetectorRef
    , private router: Router
  ) {

  }

  editUserForm(value) {
    this.utils.internalDataBus.next({ type: 'edit-client', data: value })
    this.router.navigate(['client']);
  }

  activeFilter(event: MatCheckboxChange) {
    console.log(event);

    this.dataSource.filterPredicate = (data: IclientSite, filter: any) => data && data.is_active.toString() == filter;
    this.dataSource.filter = this.isActive.toString();
  }


  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.utils.clients.subscribe(
        (value) => {
          this.clientSites = value;
          this.dataSource = new MatTableDataSource(this.clientSites);
          this.cdref.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




}
