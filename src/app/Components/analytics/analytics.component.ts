import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { PRIORITY, Task, TaskAnalytics, TASK_MANAGER_ANALTYICS } from "src/app/modules/taskModule";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.css"],
})
export class AnalyticsComponent implements OnInit {
  Selector: string = "Yearly";
  toggle: boolean = false;
  ChartSelector: string = "doughnut";
  FilterStatus: string = "Filter";
  FilterIcon: string = "fas fa-chevron-down";
  totalTasks: number = 0;
  completedTasks: number = 0
  inCompleteTasks: number = 0

  constructor(private TaskArr: TaskService) {}

  ngOnInit(): void {
    this.analytics()
  }
  Chart(chart: string) {
    const myChart = new Chart("myChart", {
      type: chart,
      options: {
          legend: {
            display: false
          }
      },
      data: {
        labels: [
          'Completed Task',
          'Incomplete Task',
        ],
        datasets: [
          {
            label: "# of Tasks",
            data: [this.completedTasks, this.inCompleteTasks],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }
  SelectorCalled(name: string) {
    this.Selector = name;
    this.analytics()
  }
  ChartSelectorCalled(name: string) {
    this.ChartSelector = name;
    this.Chart(this.ChartSelector);
  }
  DropDownClicked() {
    this.toggle = !this.toggle;
  }
  SetFilterStatus(filter: string, icon: string) {
    this.FilterStatus = filter;
    this.FilterIcon = icon;
    this.toggle = !this.toggle;
    this.analytics()
  }
  analytics(){
    let parameter: TASK_MANAGER_ANALTYICS = TASK_MANAGER_ANALTYICS.YEARLY
    if(this.Selector === "Monthly"){
      parameter = TASK_MANAGER_ANALTYICS.MONTHLY
    } else if(this.Selector === "Weekly"){
      parameter = TASK_MANAGER_ANALTYICS.WEEKLY
    }
    
    let priority = PRIORITY.ALL
    if(this.FilterStatus === "High"){
      priority = PRIORITY.HIGH
    }else if(this.FilterStatus === "Medium"){
      priority = PRIORITY.MEDIUM
    }else if(this.FilterStatus === "Low"){
      priority = PRIORITY.LOW
    }

    this.TaskArr.analytics(parameter, priority).subscribe((res: TaskAnalytics) => {
    this.totalTasks = res.totalTasks
    this.completedTasks = res.completedTasks
    this.inCompleteTasks = res.inCompleteTasks
    this.Chart(this.ChartSelector);  
    })
  }
}
