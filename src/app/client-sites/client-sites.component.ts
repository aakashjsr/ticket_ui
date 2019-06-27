import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IclientSite } from '../utils/userInfo';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-sites',
  templateUrl: './client-sites.component.html',
  styleUrls: ['./client-sites.component.scss']
})
export class ClientSitesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'city', 'phone', 'email', 'vWeb'];
  dataSource: MatTableDataSource<IclientSite>;
  vendors = [];
  @Input('id') set Id(id: string) {
    this.createNewUser(id).subscribe(
      (value) => {
        this.vendors = value;
        console.log(value);
        this.dataSource = new MatTableDataSource(this.vendors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );

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


  createNewUser(id: any): Observable<IclientSite[]> {
    return this.apiService.get<IclientSite[]>("entities/client-sites", { client: id })
  }

}
