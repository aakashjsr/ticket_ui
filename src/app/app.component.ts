import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticket-management';

  constructor(private router: Router) { }

  async checkAuthentication() {
    if (await localStorage.getItem('token')) {
      this.router.navigate(["/login"])
    } else {
      this.router.navigate(["/"]);
    }
  }
}
