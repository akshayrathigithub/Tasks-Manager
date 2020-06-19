import { Component, OnInit, HostListener } from "@angular/core";
import { Task } from "../../modules/taskModule";
import { TaskService } from "src/app/services/task.service";
import { ConvertTimeService } from "src/app/services/convert-time.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})

export class MainComponent implements OnInit {

  /* when the tab is closed or browser crashes */
  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    this.ModalSelector.task.active = false
    this.TaskArr.getTaskUpdated(this.ModalSelector.task)
  }
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
    timer: "--:--:--",
    id: "-1",
    status: false,
  };
  TOTALSEC: any;
  Part: number = 0;
  TotalSec: number;
  Status: boolean;
  IsBlur: boolean = false;
  ModalSelector: { status: string; task: Task } ={ 
    status: '',
    task: {_id: '',
      name: '',
      priority: '',
      totalTime: '',
      leftTime: '',
      active: false,
      status: '',
      created: -1
    }
  }

  constructor(
    private TaskArr: TaskService,
    private TimeService: ConvertTimeService
  ) {
    this.TaskArr.Task$.subscribe((res: Task) => {
      this.ModalSelector.task = res
      this.Status = res.active;
      this.TOTALSEC = this.TimeService.getSeconds(res.totalTime);
      this.TotalSec = this.TimeService.getSeconds(res.leftTime);
      console.log(res.totalTime, res.leftTime)
      if(this.TotalSec > 0){
        this.TimeRemaining(res);
      }
    });

    this.TaskArr.PopUp$.subscribe((modal: any) => {
      this.ModalSelector.status = modal.status;
      this.ModalSelector.task = modal.task;
      this.IsBlur = !this.IsBlur;
    });

    this.TaskArr.Component$.subscribe((comp: string) => {
      this.Component = comp
    })

    this.TaskArr.TaskArr$.subscribe((res: any) => {
      this.Tasks = [...res.posts];
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

  Clicked(Name: string) {
    this.Component = Name;
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
    this.ModalSelector.task.leftTime = time
    this.DisplayTimer = {
      ring: this.Part,
      timer: time,
      task: task.name,
      id: task._id,
      status: task.active
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

  ModalAction(ActionType: string) {
    if(ActionType == "TimesUp"){
      this.ModalSelector.task.status = "InCompleted"
      this.TaskArr.getTaskUpdated(this.ModalSelector.task)
      this.PopUpModal()
    }else if(ActionType === "Completed"){
      this.ModalSelector.task.status = "Completed"
      this.TaskArr.getTaskUpdated(this.ModalSelector.task)
      this.PopUpModal()
    }else if(ActionType === "Deleted"){
      this.TaskArr.getTaskDeleted(this.ModalSelector.task._id)
      this.PopUpModal()
    }else{
      null
    }
  }
}
