import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticket-management';
  loading = false;

  constructor(private router: Router, private utils: UtilsService) {
    this.utils.showLoader.subscribe(value => this.loading = value);
  }

  async checkAuthentication() {
    if (await localStorage.getItem('token')) {
      this.router.navigate(["/login"])
    } else {
      this.router.navigate(["/"]);
    }
  }
}
