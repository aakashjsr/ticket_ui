import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { DeviceInfo } from "../utils/userInfo";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { UtilsService } from "../services/utils.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-vendors-account-table",
  templateUrl: "./vendors-account-table.component.html",
  styleUrls: ["./vendors-account-table.component.scss"]
})
export class VendorsAccountTableComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "phone",
    "color",
    "vService",
    "vWeb",
    "notes",'edit'
  ];
  dataSource: MatTableDataSource<DeviceInfo>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  users = [];
  constructor(
    private apiService: ApiIntercepterService,
    private utils: UtilsService,
    private router: Router
  ) {
    // Assign the data to the data source for the table to render
  }

  editUserForm(accDetail: any) {
    this.utils.internalDataBus.next({ type: "edit-vac", data: accDetail });
    this.router.navigate(["vendor-account"]);
  }

  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.createNewUser(user.id).subscribe(value => {
        this.users = value;
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

  createNewUser(id: any): Observable<DeviceInfo[]> {
    return this.apiService.get("entities/vendor-accounts/", { client: id });
  }
}
