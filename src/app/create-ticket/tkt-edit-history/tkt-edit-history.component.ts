import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tkt-edit-history',
  templateUrl: './tkt-edit-history.component.html',
  styleUrls: ['./tkt-edit-history.component.scss']
})
export class TktEditHistoryComponent implements OnInit {
  @Input("tktHistory") tktHistories = [];
  constructor() { }

  ngOnInit() {
  }

}
