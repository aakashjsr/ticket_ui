import { Component, OnInit } from '@angular/core';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { UtilsService } from '../services/utils.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(private apiService: ApiIntercepterService, public utils: UtilsService, private snackBar: MatSnackBar) { }



  ngOnInit() {
    this.apiService.get("accounts/users/").subscribe(users => {
      console.log(users);
    });
  }

}
