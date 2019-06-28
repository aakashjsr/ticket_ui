import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ApiIntercepterService } from 'src/app/services/api-intercepter.service';
import { IUserInfo } from '../../utils/userInfo';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'cell', 'email', 'notes'];
  dataSource: MatTableDataSource<IUserInfo>;
  users = [];

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: true }) sort: MatSort;

  constructor(private apiService: ApiIntercepterService,
    private utils: UtilsService
  ) {
  }

  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.createNewUser(user.id).subscribe((users) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new User. */
  createNewUser(id: any): Observable<Array<IUserInfo>> {
    return this.apiService.get<Array<IUserInfo>>("accounts/client-users", { client: id });
  }
}


