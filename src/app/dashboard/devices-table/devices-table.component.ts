import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ApiIntercepterService } from '../../services/api-intercepter.service';
import { DeviceInfo } from '../../utils/userInfo';
import { Observable } from 'rxjs';


@Component({
  selector: 'devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss']
})
export class DevicesTableComponent implements OnInit {
  @Input('id') set userId(id: any) {
    this.createNewUser(id).subscribe((value) => {
      this.users = value;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = ['name', 'phone', 'color', 'vService', 'vWeb', 'notes'];
  dataSource: MatTableDataSource<DeviceInfo>;

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: true }) sort: MatSort;
  users = [];
  constructor(private apiService: ApiIntercepterService) {


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


  createNewUser(id: number): Observable<DeviceInfo[]> {
    return this.apiService.get("entities/devices", { client: 1 })
  }

}
