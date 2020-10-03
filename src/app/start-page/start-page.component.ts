import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_common/services/auth.service';


@Component({
  selector: 'mf-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],

})
export class StartPageComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

}
