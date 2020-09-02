import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mf-account-creation-main-layout',
  templateUrl: './account-creation-main-layout.component.html',
  styleUrls: ['./account-creation-main-layout.component.scss']
})
export class AccountCreationMainLayoutComponent implements OnInit {
  public counter = 1;

  constructor() {}

ngOnInit(): void {
  }

  updateCounter(): void {
    this.counter++;
  }
}
