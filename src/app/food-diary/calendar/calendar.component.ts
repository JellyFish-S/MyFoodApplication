import { Component, OnInit } from '@angular/core';
import {DateService} from '../../services/date.service';
import {Week} from '../../interfaces';
import * as moment from 'moment';
import 'moment/locale/ru';

@Component({
  selector: 'mf-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[];

  constructor(public dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generateDays.bind(this));
  }

  go(dir: number): void {
    this.dateService.changeMonth(dir);
  }

  generateDays(now: moment.Moment): void {
    moment().locale('ru');
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];
    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');
            return {
              value, active, disabled, selected
            };
          })
      });
    }
    this.calendar = calendar;
  }

  select(day: moment.Moment): void {
    this.dateService.changeDate(day);
  }
}
