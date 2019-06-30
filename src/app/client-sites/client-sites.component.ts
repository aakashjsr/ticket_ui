import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IclientSite } from '../utils/userInfo';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { Observable } from 'rxjs';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-client-sites',
  templateUrl: './client-sites.component.html',
  styleUrls: ['./client-sites.component.scss']
})
export class ClientSitesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'city', 'phone', 'email', 'vWeb'];
  dataSource: MatTableDataSource<IclientSite>;
  clientSites = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiIntercepterService, private utils: UtilsService) {

  }

  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.createNewUser(user.id).subscribe(
        (value) => {
          this.clientSites = value;
          console.log(value);
          this.dataSource = new MatTableDataSource(this.clientSites);
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
    return this.apiService.get<IclientSite[]>("entities/client-sites/", { client: id })
  }

}
