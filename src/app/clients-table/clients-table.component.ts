import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatCheckboxChange } from '@angular/material';
import { IClient } from '../utils/userInfo';
import { UtilsService } from '../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'website', 'edit'];
  dataSource: MatTableDataSource<IClient>;
  clients = [];
  isActive = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private utils: UtilsService
    , private router: Router
  ) {

  }

  editUserForm(value: IClient) {
    this.router.navigate([`edit-client/${value.id}`]);
  }

  activeFilter(event: MatCheckboxChange) {
    console.log(event);

    this.dataSource.filterPredicate = (data: IClient, filter: any) => data && data.is_active.toString() == filter;
    this.dataSource.filter = this.isActive.toString();
  }


  ngOnInit() {
    this.utils.currentUser.subscribe(user => {
      if (!user) return;
      this.utils.clients.subscribe(
        (value) => {
          if (!value) return;
          console.log(value);
          this.clients = value;
          this.dataSource = new MatTableDataSource(this.clients);
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


}
