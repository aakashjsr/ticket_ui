import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort, MatCheckboxChange } from "@angular/material";
import { ApiIntercepterService } from "../../services/api-intercepter.service";
import { IUserInfo } from "../../utils/userInfo";
import { Observable } from "rxjs";
import { UtilsService } from "../../services/utils.service";
import { Router } from '@angular/router';
@Component({
  selector: "users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.scss"]
})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = ["name", 'last_name', "phone", "cell", "email", 'user_type', "notes", "edit"];
  dataSource: MatTableDataSource<IUserInfo>;
  users = [];
  isActive = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apiService: ApiIntercepterService,
    private utils: UtilsService,
    private router: Router
  ) { }

  editUserForm(userInfo: any) {
    this.utils.internalDataBus.next({ type: "edit-user", data: userInfo });
    this.router.navigate(["/user"]);
  }

  activeFilter(event: MatCheckboxChange) {
    this.dataSource.filterPredicate = (data: IUserInfo, filter: any) => data && data.is_active.toString() == filter;
    this.dataSource.filter = this.isActive.toString();
  }

  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.createNewUser(user.id).subscribe(users => {
        users.sort((a, b) => (a.first_name.toLowerCase() < b.first_name.toLowerCase() ? -1 : 1));
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new User. */
  createNewUser(id: any): Observable<Array<IUserInfo>> {
    return this.apiService.get<Array<IUserInfo>>("accounts/client-users/", {
      client: id
    });
  }
}
