import { Component, OnInit, HostListener } from "@angular/core";
import { Task, TASK_STATUS } from "../../modules/taskModule";
import { TaskService } from "src/app/services/task.service";
import { ConvertTimeService } from "src/app/services/convert-time.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  /* when the tab is closed or browser crashes */
  @HostListener("window:beforeunload", ["$event"])
  doSomething($event) {
    // this.ModalSelector.task.active = false;
  }
  CurrTasks: Task[];
  PrevTasks: Task[];
  ToggleBtn: boolean = true;
  Component: string = "Task";
  DisplayTimer: {
    ring: number;
    task: string;
    timer: string;
    id: string;
    status: TASK_STATUS;
  } = {
    ring: 0,
    task: "Please Select task from task list",
    timer: "--:--:--",
    id: "-1",
    status: TASK_STATUS.NOT_STARTED,
  };
  TOTALSEC: any;
  Part: number = 0;
  TotalSec: number;
  IsBlur: boolean = false;
  ModalSelector: { status: string; task: Task } = {
    status: "",
    task: {
      _id: "",
      taskName: "",
      priority: "",
      totalTime: "",
      timeLeft: "",
      status: TASK_STATUS.NOT_STARTED,
      isDeleted: false,
      date: "",
    },
  };

  constructor(
    private TaskArr: TaskService,
    private TimeService: ConvertTimeService
  ) {
    this.TaskArr.Task$.subscribe((res: Task) => {
      this.ModalSelector.task = res;
      this.TOTALSEC = this.TimeService.getSeconds(res.totalTime);
      if(this.DisplayTimer.timer === "--:--:--"){
        this.TotalSec = this.TimeService.getSeconds(res.totalTime);
      }else{
        this.TotalSec = this.TimeService.getSeconds(res.timeLeft);
      }

      this.CurrTasks.forEach((task: Task) => {
        if (task._id === res._id) {
          task = res;
        }
      })
     
      if (this.TotalSec > 0) {
        this.TimeRemaining(res);
      }
    });

    this.TaskArr.PopUp$.subscribe((modal: any) => {
      this.ModalSelector.status = modal.status;
      if (modal.status !== "RemoveTask") {
        this.ModalSelector.task = modal.task;
      }
      this.IsBlur = !this.IsBlur;
    });

    this.TaskArr.Component$.subscribe((comp: string) => {
      this.Component = comp;
    });

    this.TaskArr.TaskArr$.subscribe((res: any) => {
      this.CurrTasks = [...res.CurrentTasks];
      this.PrevTasks = [...res.PreviousTasks];
    });
  }

  ngOnInit(): void {
    this.TaskArr.TaskArr$.subscribe((res: any) => {
      const Tasks = [...res.CurrentTasks];
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
    if (task.status === TASK_STATUS.IN_PROGRESS) {
      this.TotalSec = this.TotalSec - 1;
    } else {
      this.TotalSec = this.TotalSec;
    }
    this.Part = Math.floor((this.TotalSec / this.TOTALSEC) * 100);
    let totalsec = this.TotalSec;
    let time: string = this.TimeService.getTime(totalsec);
    this.ModalSelector.task.timeLeft = time;
    this.DisplayTimer = {
      ring: this.Part,
      timer: time,
      task: task.taskName,
      id: task._id,
      status: task.status,
    };
    if (task.status === TASK_STATUS.IN_PROGRESS) {
      if (this.TotalSec === 0) {
          this.ModalSelector.status = "TimeLimitCompleted";
          this.IsBlur = true;
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
    if (ActionType == "TimesUp") {
      this.ModalSelector.task.status = TASK_STATUS.INCOMPLETE
      this.PopUpModal();
    } else if (ActionType === "Completed") {
      this.ModalSelector.task.status = TASK_STATUS.SUCCESSFULLY_COMPLETED;
      this.PopUpModal();
    } else if (ActionType === "Deleted") {
      this.TaskArr.getTaskDeleted(this.ModalSelector.task._id);
      this.PopUpModal();
    } else {
      null;
    }
  }
}
