import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { IUserInfo } from '../utils/userInfo';

enum EshowUserInfoType {
  USERINFO,
  DEVICES,
  VENDOR,
  NETWORK
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: IUserInfo;
  private _showCurrentUserInfoType: EshowUserInfoType = EshowUserInfoType.USERINFO;
  public get showCurrentUserInfoType(): EshowUserInfoType {
    return this._showCurrentUserInfoType;
  }
  public set showCurrentUserInfoType(value: EshowUserInfoType) {
    this._showCurrentUserInfoType = value;
  }

  clients: Array<IUserInfo> = [
    {
      _id: 1,
      first_name: 'john',
      last_name: 'doe',
      email: 'johndoe@gmail.com',
      work_phone: '34893849343',
      cell_phone: '45895895554',
      phone_ext: "+91",
      user_type: "client",
      primary_contact: "3895489548954",
      notes: "lorem ipsum",
      client_id: "22",
      user_group: "alpha",
      bussiness_id: '1234'
    },
    {
      _id: 2,
      first_name: 'jean',
      last_name: 'doe',
      email: 'jeandoe@gmail.com',
      work_phone: '34893849343',
      cell_phone: '45895895554',
      phone_ext: "+91",
      user_type: "client",
      primary_contact: "3895489548954",
      notes: "lorem ipsum",
      client_id: "22",
      user_group: "alpha",
      bussiness_id: '1234'
    },
    {
      _id: 3,
      first_name: 'mike',
      last_name: 'tyson',
      email: 'miketyson@gmail.com',
      work_phone: '34893849343',
      cell_phone: '45895895554',
      phone_ext: "+91",
      user_type: "client",
      primary_contact: "3895489548954",
      notes: "lorem ipsum",
      client_id: "22",
      user_group: "alpha",
      bussiness_id: '1234'
    }
  ]


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) { }
  ngOnInit() {
    this.currentUser = this.clients[0];
  }

}
