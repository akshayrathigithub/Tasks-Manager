import { Component, OnInit } from "@angular/core";
import { Task } from "../../modules/taskModule";
import { TaskService } from "src/app/services/task.service";
import { ConvertTimeService } from "src/app/services/convert-time.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  Tasks: Task[]
  Component: string = "Task";
  DisplayTimer: {
    ring: number;
    task: string;
    timer: string;
    id: string;
    status: boolean;
  } = {
    ring: 0,
    task: "Please Select task from task list",
    timer: "00:00:00",
    id: "-1",
    status: false,
  };
  TOTALSEC: any;
  Part: number = 0;
  TotalSec: number;
  Status: boolean;
  IsBlur: boolean = false;
  ModalSelector: { status: string; id: string };

  Clicked(Name: string) {
    this.Component = Name;
  }
  constructor(
    private TaskArr: TaskService,
    private TimeService: ConvertTimeService
  ) {
    this.TaskArr.Task$.subscribe((res: Task) => {
      this.Status = res.active;
      this.TOTALSEC = res.totalTime;
      this.TOTALSEC = this.TimeService.getSeconds(this.TOTALSEC);
      this.TotalSec = this.TimeService.getSeconds(res.leftTime);
      this.TimeRemaining(res);
    });
    this.TaskArr.PopUp$.subscribe((modal: any) => {
      this.ModalSelector.status = modal.status;
      this.ModalSelector.id = modal._id;
      this.IsBlur = !this.IsBlur;
    });
    this.TaskArr.Component$.subscribe((comp: string) => {
      this.Component = comp
    })
    this.TaskArr.TaskArr$.subscribe((res: any) => {
      this.Tasks = [...res.posts];
      console.log(res.posts, "todoComponent");
    });
  }
  ngOnInit(): void {
    this.TaskArr.TaskArr$.subscribe((res: any) => {
      const Tasks = [...res.posts];
      if (Tasks.length === 0) {
        this.Component = "NoTaskFound";
      } else {
        this.Component = "Task";
      }
    });
  }
  TimeRemaining(task: Task) {
    if (this.Status) {
      this.TotalSec = this.TotalSec - 1;
    } else {
      this.TotalSec = this.TotalSec;
    }
    this.Part = Math.floor((this.TotalSec / this.TOTALSEC) * 100);
    let totalsec = this.TotalSec;
    let time: string = this.TimeService.getTime(totalsec);
    this.DisplayTimer = {
      ring: this.Part,
      timer: time,
      task: task.name,
      id: task._id,
      status: task.active,
    };
    if (this.Status) {
      if (this.TotalSec === 0 || !this.Status) {
        if (this.TotalSec === 0) {
          this.ModalSelector.status = "TimeLimitCompleted";
          this.IsBlur = true;
        }
        console.log("Completed");
      } else {
        setTimeout(() => {
          this.TimeRemaining(task);
        }, 1000);
      }
    }
  }
  PopUpModal() {
    this.ModalSelector.status = "";
    this.IsBlur = !this.IsBlur;
  }
  ModalAction(type: string) {
    console.log("Hello");
  }
}
