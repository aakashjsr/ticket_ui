import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiIntercepterService } from '../services/api-intercepter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showDropDown = false;

  constructor(private router: Router, private apiService: ApiIntercepterService) { }

  logout() {
    this.apiService.post("accounts/logout/").subscribe((value) => {
      localStorage.clear();
      this.router.navigate(["/login"]);
    });
  }

  ngOnInit() {
  }

}
