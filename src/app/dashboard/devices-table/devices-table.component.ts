import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort, MatCheckboxChange } from "@angular/material";
import { ApiIntercepterService } from "../../services/api-intercepter.service";
import { DeviceInfo } from "../../utils/userInfo";
import { Observable } from "rxjs";
import { UtilsService } from "../../services/utils.service";
import { Router } from "@angular/router";

@Component({
  selector: "devices-table",
  templateUrl: "./devices-table.component.html",
  styleUrls: ["./devices-table.component.scss"]
})
export class DevicesTableComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "phone",
    "color",
    "vService",
    "vWeb",
    "notes",
    "edit"
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


  activeFilter(event: MatCheckboxChange) {
    console.log(event);
    if (!event.checked) {
      this.applyFilter('');
      return;
    }
    this.dataSource.filterPredicate = (data: DeviceInfo, filter: any) => data.is_active == filter;
    this.dataSource.filter = event.checked.toString();
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

  editUserForm(deviceInfo: DeviceInfo) {
    this.utils.internalDataBus.next({ type: "edit-device", data: deviceInfo });
    this.router.navigate(["/device"]);
  }

  createNewUser(id: any): Observable<DeviceInfo[]> {
    return this.apiService.get("entities/devices/", { client: id });
  }
}
