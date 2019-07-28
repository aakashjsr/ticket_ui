import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { IClient, IclientSite, ICleientSites } from '../utils/userInfo';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService implements OnDestroy {
  internalDataBus = new Subject<{ type: string, data: any }>();
  showLoader = new Subject<boolean>();
  currentUser = new ReplaySubject<IClient>(0);
  // client_sites = new ReplaySubject<IclientSite[]>(0);
  clients = new ReplaySubject<ICleientSites[]>(0);
  constructor(private cookieService: CookieService) { }

  ngOnDestroy(): void {
    this.showLoader.unsubscribe();
    this.currentUser.unsubscribe();
    this.internalDataBus.unsubscribe();
  }


  setCookies(values: { [key: string]: any }) {
    for (const key in values) {
      this.setCookie(key, values[key]);
    }
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  clearCoockies() {
    this.cookieService.deleteAll();
  }


  setCookie(key: string, value: any) {
    this.cookieService.set(key, value);
  }

}
