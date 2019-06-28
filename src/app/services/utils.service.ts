import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { IClient } from '../utils/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  showLoader = new Subject<boolean>();
  currentUser = new BehaviorSubject<IClient>({ client_id: '000', id: '1', name: 'sjkdsjkdsjkd', active: true, past_due_date: true, website: '' });
  constructor() { }

}
