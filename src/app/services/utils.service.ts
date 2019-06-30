import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { IClient } from '../utils/userInfo';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService implements OnDestroy {
  internalDataBus = new BehaviorSubject<{ type: string, data: any }>(null);
  showLoader = new Subject<boolean>();
  currentUser = new BehaviorSubject<IClient>({ client_id: '000', id: '1', name: 'sjkdsjkdsjkd', active: true, past_due_date: true, website: '' });
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


  setCookie(key: string, value: any) {
    this.cookieService.set(key, value);
  }
}
