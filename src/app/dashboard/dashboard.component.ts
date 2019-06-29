import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { IUserInfo, IClient } from '../utils/userInfo';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { FormControl } from '@angular/forms';
import { UtilsService } from '../services/utils.service';
import { Router } from '@angular/router';

enum EshowUserInfoType {
  USERINFO = 'userinfo',
  DEVICES = 'devices',
  VENDOR = 'vendor',
  NETWORK = 'network',
  CLIENT_SITES = "client_sites",
  TICKET = 'ticket'
}

interface ICleientSites {
  active: boolean
  client_id: string;
  id: string;
  name: string;
  past_due_date: boolean;
  website: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser = new FormControl();
  private _showCurrentUserInfoType: any = EshowUserInfoType.USERINFO;
  public get showCurrentUserInfoType(): any {
    return this._showCurrentUserInfoType;
  }
  public set showCurrentUserInfoType(value: any) {
    this._showCurrentUserInfoType = value;
  }

  clients: Array<ICleientSites> = [];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  getUsers() {
    this.apiService.get<Array<ICleientSites>>("accounts/clients").subscribe((value) => {
      this.clients.push(...value);
      if (this.clients && this.clients.length) {
        this.currentUser.patchValue(this.clients[0].name);
        this.utils.currentUser.next(this.clients[0]);
      }
    });
  }

  logout() {
    this.apiService.post("accounts/logout/").subscribe((value) => {
      localStorage.clear();
      this.router.navigate(["/login"]);
    });
  }

  navTo(path: string, selectionType: string) {
    this.router.navigate([path]);
    this.showCurrentUserInfoType = selectionType;
  }

  onClientSelect(value: IClient) {
    this.utils.currentUser.next(value);
    console.log(value);
  }
  constructor(
    private breakpointObserver: BreakpointObserver
    , private apiService: ApiIntercepterService
    , private utils: UtilsService
    , private router: Router
  ) { }
  ngOnInit() {
    this.getUsers();
  }

}
