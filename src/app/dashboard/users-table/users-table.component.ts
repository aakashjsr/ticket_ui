import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ApiIntercepterService } from 'src/app/services/api-intercepter.service';
import { IUserInfo } from '../../utils/userInfo';
import { Observable } from 'rxjs';



@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'cell', 'email', 'notes'];
  dataSource: MatTableDataSource<IUserInfo>;
  users = [];

  @Input("id") set setId(id: any) {
    this.createNewUser(id).subscribe((users) => {
      this.users = users;
      console.log(users);
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: true }) sort: MatSort;

  constructor(private apiService: ApiIntercepterService) {
    // Create 100 users

    // Assign the data to the data source for the table to render
  }

  ngOnInit() {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new User. */
  createNewUser(id: number): Observable<Array<IUserInfo>> {
    return this.apiService.get<Array<IUserInfo>>("accounts/client-users", { client: id });
  }
}


