import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, startWith } from 'rxjs/operators';
import { IUserInfo, IClient, ICleientSites, IclientSite } from '../utils/userInfo';
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
  TICKET = 'ticket',
  VENDORS_ACCOUNT = 'vendors-accounts'
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser = new FormControl();
  currentUserRole: string = 'hello';
  filteredStates: Observable<any[]>;
  private _showCurrentUserInfoType: any = EshowUserInfoType.TICKET;
  public get showCurrentUserInfoType(): any {
    return this._showCurrentUserInfoType;
  }
  public set showCurrentUserInfoType(value: any) {
    this._showCurrentUserInfoType = value;
  }

  constructor(
    private breakpointObserver: BreakpointObserver
    , private apiService: ApiIntercepterService
    , private utils: UtilsService
    , private router: Router
  ) { }

  navToRoute(path: string) {
    this.router.navigate([`/${path}`]);
    this.utils.internalDataBus.next({ type: 'refresh_table', data: null });
  }

  get username() {
    return this.utils.getCookie('first_name')
  }

  get userRole() {
    return this.utils.getCookie('user_type').replace('_', ' ');
  }

  clients: Array<ICleientSites> = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  getClients() {
    this.apiService.get<Array<ICleientSites>>("accounts/clients/").subscribe((value) => {
      this.clients.push(...value);
      this.filteredStates = this.currentUser.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this._filterStates(state) : this.clients.slice())
        );
      if (this.clients && this.clients.length) {
        this.currentUser.patchValue(this.clients[0].name);
        this.utils.currentUser.next(this.clients[0]);
        this.apiService.get<IclientSite[]>("entities/client-sites/", { client: this.clients[0].id })
          .subscribe(client_ites => this.utils.client_sites.next(client_ites));
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
    this.apiService.get<IclientSite[]>("entities/client-sites/", { client: value.id })
      .subscribe(client_ites => this.utils.client_sites.next(client_ites));
  }

  ngOnInit() {
    this.getClients();
    this.currentUserRole = this.utils.getCookie('user_type');
    this.utils.internalDataBus.subscribe((value) => {
      if (value && value.type == 'update_client') {
        this.clients.push(value.data);
      }
    });
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.clients.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
