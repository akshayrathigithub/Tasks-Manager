import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  constructor() {}
  Selector: string = 'Weekly'
  toggle: boolean = false
  ChartSelector: string = "doughnut"
  ngOnInit(): void {
    const myChart = new Chart('myChart', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: '# of Votes',
            data: [15, 19, 30],
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderWidth: 1,
          },
        ],
      },
      // options: {
      //     scales: {
      //         yAxes: [{
      //             ticks: {
      //                 beginAtZero: true
      //             }
      //         }]
      //     }
      // }
    });
  }
  SelectorCalled(name: string){
    this.Selector = name
  }
  ChartSelectorCalled(name: string){
    this.ChartSelector = name
  }
  DropDownClicked(){
    this.toggle = !this.toggle
  }
}
