import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ApiIntercepterService } from './api-intercepter.service';
import { map, publishLast, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  showLoader = new Subject<boolean>();
  constructor() { }

}
