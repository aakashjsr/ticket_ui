import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './services/utils.service';
import { timer } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ticket-management';
  loading = false;
  loaderConfig = {
    fullScreenBackdrop: true,
  };

  constructor(private router: Router, private utils: UtilsService, private snackBar: MatSnackBar) {

    this.utils.showLoader.subscribe(value => {
      setTimeout(() => {
        this.loading = value
      }, 0);
    });
  }

  ngOnInit(): void {
    this.utils.internalDataBus.subscribe((value) => {
      if (value && value.type == 'error') {
        const errMsg = value.data;
        let keys = Object.keys(errMsg);
        let key = keys.pop();
        this.snackBar.open(errMsg[key], `${key.replace(/\_/g, " ")}`, { duration: 1000 })
      }
    });
  }

  async checkAuthentication() {
    if (await localStorage.getItem('token')) {
      this.router.navigate(["/login"])
    } else {
      this.router.navigate(["/"]);
    }
  }
}
