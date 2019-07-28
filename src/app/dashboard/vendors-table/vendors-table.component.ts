import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatCheckboxChange } from '@angular/material';
import { ApiIntercepterService } from '../../services/api-intercepter.service';
import { Observable } from 'rxjs';
import { IVendor } from '../../utils/userInfo';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vendors-table',
  templateUrl: './vendors-table.component.html',
  styleUrls: ['./vendors-table.component.scss']
})
export class VendorsTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'service', 'email', 'vWeb', 'edit'];
  dataSource: MatTableDataSource<IVendor>;
  vendors = [];
  isActive = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apiService: ApiIntercepterService,
    private utils: UtilsService,
    private router: Router
  ) {

  }

  editUserForm(value: IVendor) {
    this.router.navigate([`edit-vendor/${value.id}`]);
  }

  activeFilter(event?: MatCheckboxChange) {
    console.log(event);

    this.dataSource.filterPredicate = (data: IVendor, filter: any) => data && data.is_active.toString() == filter;
    this.dataSource.filter = this.isActive.toString();
  }


  ngOnInit() {

    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.createNewUser(JSON.parse(this.utils.getCookie('client'))['id']).subscribe(
        (value) => {
          this.vendors = value;
          console.log(value);
          this.dataSource = new MatTableDataSource(this.vendors);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.activeFilter();
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
  createNewUser(id: any): Observable<IVendor[]> {
    return this.apiService.get<IVendor[]>("entities/vendors/", { client: id })
  }

}
