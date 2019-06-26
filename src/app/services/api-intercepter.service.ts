import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { share, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiIntercepterService {
  private baseUrl = `${environment.method}${environment.baseUrl}`;
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  })
  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    if (localStorage.getItem("token"))
      this.headers.set("Authorization", localStorage.getItem("token"));
  }

  handleSpinner(observable: Observable<any>) {
    this.utils.showLoader.next(true);
    observable.subscribe(() => this.utils.showLoader.next(false), () => this.utils.showLoader.next(false));
  }
  get<T>(path: string, params?: { [key: string]: any }): Observable<T> {
    const getReq = this.httpClient.get<T>(this.baseUrl + this.addQueryParam(path, params),
      { headers: this.headers }) // observe 'response' is going to return full response body
      .pipe(
        share(),
        tap(console.log),
      );
    this.handleSpinner(getReq);
    return getReq;
  }

  post<T>(path: string, params?: { [key: string]: any }): Observable<T> {
    const postReq = this.httpClient.post<T>(this.baseUrl + path, params, { headers: this.headers }).pipe(share());
    this.handleSpinner(postReq);
    return postReq;
  }

  patch<T>(path: string, params?: { [key: string]: any }): Observable<T> {
    const patchReq = this.httpClient.patch<T>(this.baseUrl + path, params, { headers: this.headers }).pipe(share());
    this.handleSpinner(patchReq);
    return patchReq;
  }

  delete<T>(path: string, params?: { [key: string]: any }): Observable<T> {
    const delReq = this.httpClient.delete<T>(this.baseUrl + path, params).pipe(share());
    this.handleSpinner(delReq);
    return delReq;
  }




  private addQueryParam(url: string, params: any): string {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        url = this.updateQueryStringParameter(url, key, params[key]);
      }
    }
    return url;
  }

  private updateQueryStringParameter(uri: string, key: any, value: any) {
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  }

}
