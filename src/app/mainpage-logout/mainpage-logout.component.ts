import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'mf-mainpage-logout',
  templateUrl: './mainpage-logout.component.html',
  styleUrls: ['./mainpage-logout.component.scss'],

})
export class MainpageLogoutComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

}
