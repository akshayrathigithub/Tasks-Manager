import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/modules/taskModule';
import { TaskService } from 'src/app/services/task.service';
import { ConvertTimeService } from 'src/app/services/convert-time.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  Component: string;
  Tasks: Task[];
  DisplayTimer: {
    ring: number;
    task: string;
    timer: string;
    id: number;
    status: boolean
  } = {
    ring: 0,
    task: "Please Select task from task list",
    timer: "00:00:00",
    id: -1,
    status: false
  };
  TOTALSEC: any;
  Part: number = 0;
  TotalSec: number;
  Hours: number = 0;
  Minutes: number = 0;
  Seconds: number = 0;
  Status: boolean

  Clicked(Name: string) {
    this.Component = Name;
  }
  constructor(
    private TaskArr: TaskService,
    private TimeService: ConvertTimeService
  ) {
    this.TaskArr.Task$.subscribe((res: Task) => {
      this.Status = res.active
      this.TOTALSEC = res.totalTime;
      this.TOTALSEC = this.TimeService.getSeconds(this.TOTALSEC);
      this.TotalSec = this.TimeService.getSeconds(res.leftTime);
      this.TimeRemaining(res);
    });
  }
  ngOnInit(): void {
    this.Tasks = this.TaskArr.getTasks();
    if (this.Tasks.length === 0) {
      this.Component = 'NoTaskFound';
    } else {
      this.Component = 'Timer';
    }
  }
  TimeRemaining(task: Task) {
    if(this.Status){
      this.TotalSec = this.TotalSec - 1;
    }else{
      this.TotalSec = this.TotalSec;
    }
    this.Part = Math.floor((this.TotalSec / this.TOTALSEC) * 100);
    let totalsec = this.TotalSec;
    let time: string = this.TimeService.getTime(totalsec);
    this.DisplayTimer = {
      ring: this.Part,
      timer: time,
      task: task.name,
      id: task.index,
      status: task.active
    };
    if(this.Status){
      if (this.TotalSec === 0 || !this.Status) {
        console.log('Completed');
      } else {
        setTimeout(() => {
          this.TimeRemaining(task);
        }, 1000);
      }
    }
 
  }
}
