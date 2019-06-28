import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ApiIntercepterService } from 'src/app/services/api-intercepter.service';
import { Observable } from 'rxjs';
import { IVendor } from '../../utils/userInfo';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'vendors-table',
  templateUrl: './vendors-table.component.html',
  styleUrls: ['./vendors-table.component.scss']
})
export class VendorsTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'service', 'email', 'vWeb'];
  dataSource: MatTableDataSource<IVendor>;
  vendors = [];

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: true }) sort: MatSort;

  constructor(
    private apiService: ApiIntercepterService,
    private utils: UtilsService,
  ) {

  }

  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.createNewUser(user.id).subscribe(
        (value) => {
          this.vendors = value;
          console.log(value);
          this.dataSource = new MatTableDataSource(this.vendors);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  createNewUser(id: any): Observable<IVendor[]> {
    return this.apiService.get<IVendor[]>("entities/vendors", { client: id })
  }

}
