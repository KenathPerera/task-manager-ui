import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';
import { TaskService } from '../../services/task.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  userRoles: string[] = [];
  public chartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: [],

    },
    title: {
      text: 'Tasks Due by Date'
    }
  };

  rangeOptions = [7, 10, 30];
  selectedRange = 7;

  totalTasks = 20;
  dueToday = 4;
  completed = 12;
  pending = 8;

  animatedTotal = 0;
  animatedToday = 0;
  animatedCompleted = 0;
  animatedPending = 0;

  constructor(private auth: AuthService, private taskService: TaskService) {
    const user = this.auth.getCurrentUser();
    this.userRoles = user?.roles || [];
  }

  ngOnInit(): void {
    console.log(this.auth.getToken());
    this.loadStats();
    this.animateAll();
  }

  loadStats(): void {
    this.taskService.getTaskStatsByDueRange(this.selectedRange).subscribe(data => {
      console.log(data)
      this.chartOptions.series = [
        { name: 'Tasks', data: data.map(d => d.count) }
      ];
      this.chartOptions.xaxis = {
        categories: data.map(d => d.dueDate)
      };
    });
  }

  onRangeChange(days: number) {
    this.selectedRange = days;
    this.loadStats();
  }
  get isAdmin(): boolean {
    return this.userRoles.includes('Admin');
  }

  animateStat(to: number, setter: (val: number) => void): void {
    let current = 0;
    const step = Math.ceil(to / 60);
    const interval = setInterval(() => {
      current += step;
      if (current >= to) {
        setter(to);
        clearInterval(interval);
      } else {
        setter(current);
      }
    }, 30);
  }

  animateAll(): void {
    this.animateStat(this.totalTasks, (val) => (this.animatedTotal = val));
    this.animateStat(this.dueToday, (val) => (this.animatedToday = val));
    this.animateStat(this.completed, (val) => (this.animatedCompleted = val));
    this.animateStat(this.pending, (val) => (this.animatedPending = val));
  }


}
