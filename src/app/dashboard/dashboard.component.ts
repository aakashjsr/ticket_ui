import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { IUserInfo } from '../utils/userInfo';
import { ApiIntercepterService } from '../services/api-intercepter.service';

enum EshowUserInfoType {
  USERINFO = 'userinfo',
  DEVICES = 'devices',
  VENDOR = 'vendor',
  NETWORK = 'network',
  CLIENT_SITES = "client_sites"
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
  currentUser: ICleientSites;
  private _showCurrentUserInfoType: any = EshowUserInfoType.NETWORK;
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
      console.log(value);
      this.clients.push(...value);
      this.currentUser = this.clients[0];
    });
  }

  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiIntercepterService) { }
  ngOnInit() {
    this.getUsers();
  }

}
