import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showDropDown = false;

  constructor(private router: Router) { }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  ngOnInit() {
  }

}
