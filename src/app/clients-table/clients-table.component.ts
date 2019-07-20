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

  displayedColumns: string[] = ['name', 'city', 'website', 'edit'];
  dataSource: MatTableDataSource<IclientSite>;
  clientSites = [];

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
    if (!event.checked) {
      this.applyFilter('');
      return;
    }
    this.dataSource.filterPredicate = (data: IclientSite, filter: any) => data.is_active == filter;
    this.dataSource.filter = event.checked.toString();
  }


  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.createNewUser(user.id).subscribe(
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


  createNewUser(id: any): Observable<IclientSite[]> {
    return this.apiService.get<IclientSite[]>("accounts/clients/");
  }

}
