import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { IUserInfo, IClient, ICleientSites, IclientSite } from '../utils/userInfo';
import { ApiIntercepterService } from '../services/api-intercepter.service';
import { FormControl } from '@angular/forms';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute, GuardsCheckEnd, NavigationEnd } from '@angular/router';
import { Location } from "@angular/common";

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
    , private route: ActivatedRoute
    , location: Location
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
    this.apiService
      .get<Array<ICleientSites>>("accounts/clients/").subscribe((value) => {
        this.clients = value;
        this.utils.clients.next(value);
        if (this.clients && this.clients.length) {
          if (!this.utils.getCookie('client')) {
            this.utils.setCookie('client', JSON.stringify(this.clients[0]));
            this.currentUser.patchValue(this.clients[0].name);
            this.utils.currentUser.next(this.clients[0]);
          } else {
            const currentClint = JSON.parse(this.utils.getCookie('client'));
            this.currentUser.patchValue(currentClint['name']);
            this.utils.currentUser.next(currentClint);
          }
        }

      });

  }

  logout() {
    this.apiService.post("accounts/logout/").subscribe((value) => {
      localStorage.clear();
      this.utils.clearCoockies();
      this.router.navigate(["/login"]);
    });
  }

  navTo(path: string, selectionType: string) {
    this.router.navigate([path]);
  }

  onClientSelect(value: IClient) {
    this.utils.currentUser.next(value);
    this.utils.setCookie('client', JSON.stringify(value));
    window.location.reload();
  }


  ngOnInit() {
    this.showCurrentUserInfoType = this.router.url;
    this.router.events.pipe(debounceTime(60)).subscribe(event => {
      console.log(event instanceof NavigationEnd);
      if (typeof GuardsCheckEnd) {
        console.log(event);
        switch ((<NavigationEnd>event).url) {
          case '/':
          case "/devices":
          case "/vendors":
          case "/vendors-accounts":
          case "/networks":
          case "/clients":
          case "/client_sites":
          case "/users":
            this.showCurrentUserInfoType = (<any>event).url;
            break;
        }
      }
    });
    this.getClients();
    this.currentUserRole = this.utils.getCookie('user_type');
    this.utils.internalDataBus.subscribe((value) => {
      if (value && value.type == 'get_client') {
        this.getClients();
      }
    });
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.clients.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
