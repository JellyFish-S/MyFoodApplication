import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {FirebaseUserInterface} from '../../interfaces';
import {CheckUserIdService} from '../../services/check-user-id.service';
import {Subscription} from 'rxjs';
import {DateService} from '../../services/date.service';


@Component({
  selector: 'mf-donuts',
  templateUrl: './donuts.component.html',
  styleUrls: ['./donuts.component.scss']
})
export class DonutsComponent implements OnInit {
  private sumCalories: number;
  public caloriesLeft: number;
  public kgLeft: number;
  private kgNow: number;
  private userInformation: FirebaseUserInterface;
  private noCaloriesLeft: number;
  subscription: Subscription;
  subscriptionWeight: Subscription;
  subscriptionCalories: Subscription;
  optionWeight: any;
  optionCalories: any;

  constructor(
    private accountService: AccountService,
    private checkUserIdService: CheckUserIdService,
    private  dateService: DateService
  ) {}

  async ngOnInit(): Promise<void> {
    this.caloriesLeft = 0;
    this.userInformation = await this.checkUserIdService.getUserInformationFromFirebase();
    this.dateService.date.pipe().subscribe(() => {
      this.caloriesLeft = 0;
      this.sumCalories = this.accountService.dailyCalories(this.sumCalories);
      this.caloriesLeft = this.userInformation.caloriesGoal - this.sumCalories;
      this.noCaloriesLeft = this.caloriesLeft;
      if (this.caloriesLeft < 0) {
        this.noCaloriesLeft = 0;
      }
      this.createDonutChartCalories();
      this.subscription = this.accountService.subject.subscribe(message => {
          this.caloriesLeft = 0;
          this.sumCalories = message;
          this.caloriesLeft = this.userInformation.caloriesGoal - this.sumCalories;
          this.noCaloriesLeft = this.caloriesLeft;
          if (this.caloriesLeft < 0) {
          this.noCaloriesLeft = 0;
        }
          this.createDonutChartCalories();
      });
      this.subscriptionCalories = this.accountService.caloriesSubject.subscribe( calorieGoal => {
        this.caloriesLeft = 0;
        this.caloriesLeft = calorieGoal - this.sumCalories;
        this.noCaloriesLeft = this.caloriesLeft;
        if (this.caloriesLeft < 0) {
          this.noCaloriesLeft = 0;
        }
        this.createDonutChartCalories();
      });
    });
    this.kgNow = this.accountService.sendWeightNow(this.kgNow);
    this.kgLeft = Math.abs(this.kgNow - this.userInformation.goalWeight);
    this.subscriptionWeight = this.accountService.weightSubject.subscribe(message => {
      this.kgLeft = 0;
      this.kgNow = message;
      this.kgLeft = Math.abs(this.kgNow - this.userInformation.goalWeight);
      this.createDonutChartWeight();
    });
    this.createDonutChartWeight();
  }
  createDonutChartWeight(): any {
    this.optionWeight = {
      tooltip: {
        trigger: 'item',
        formatter: ''
      },
      title: {
        text: this.kgLeft + ' kg',
        left: 'center',
        top: 'center',
        textStyle: {
          fontSize: 20,
          fontWeight: 600,
          color: '#5E14BC'
        },
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['75%', '85%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {value: Math.abs(this.userInformation.weight - this.kgNow)},
            {value: this.kgLeft},

          ],
          color: [
            '#F37EA1', '#fff'
          ]
        }
      ]
    };
  }
  createDonutChartCalories(): any {
    this.optionCalories = {
      tooltip: {
        trigger: 'item',
        formatter: ''
      },
      title: {
        text: this.caloriesLeft + ' cal',
        left: 'center',
        top: 'center',
        textStyle: {
          fontSize: 20,
          fontWeight: 600,
          color: '#5E14BC'
        },
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['75%', '85%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {value: this.sumCalories},
            {value: this.noCaloriesLeft},

          ],
          color: [
            '#F37EA1', '#fff'
          ]
        }
      ]
    };
  }
}

