import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/modules/taskModule';
import { TaskService } from 'src/app/services/task.service';
import { ConvertTimeService } from 'src/app/services/convert-time.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  Component: string;
  Tasks: Task[];
  DisplayTimer: any
  TOTALSEC: any;
  Part: number = 0;
  TotalSec: number;
  Hours: number = 0;
  Minutes: number = 0;
  Seconds: number = 0;

  Clicked(Name: string) {
    this.Component = Name
  }
  constructor(private TaskArr: TaskService, private TimeService: ConvertTimeService) {
    let task = this.TaskArr.TaskToTimer()
    this.TOTALSEC = task.totalTime
    this.TOTALSEC = this.TimeService.getSeconds(this.TOTALSEC)
    this.TotalSec = this.TOTALSEC
    this.TimeRemaining(task.name);
  }
  ngOnInit(): void {
    this.Tasks = this.TaskArr.getTasks();
    if (this.Tasks.length === 0) {
      this.Component = 'NoTaskFound';
    } else {
      this.Component = 'Analytics';
    }
  }
  TimeRemaining(Task: string) {
    this.TotalSec = this.TotalSec - 1
    this.Part = Math.floor((this.TotalSec/this.TOTALSEC)*100)
    let totalsec = this.TotalSec
    let time: string = this.TimeService.getTime(totalsec)
    this.DisplayTimer = {
      ring: this.Part,
      timer: time,
      task: Task
    }
    if (this.TotalSec === 0) {
      console.log("Completed")
    } else {
      setTimeout(() => {
        this.TimeRemaining(Task);
      }, 1000);
    }
  }
}
