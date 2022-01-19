import { Component, OnInit, Input, SimpleChanges, OnChanges } from "@angular/core"
import { TASK_STATUS } from "src/app/modules/taskModule"
import { TaskService } from "src/app/services/task.service"

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"],
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() Timer: any
  ringStroke: string
  TaskName: string
  PopClass: boolean = false
  constructor(private TaskArr: TaskService) {}
  ngOnInit(): void {
    this.TaskName = this.Timer.task
  }
  ngOnChanges(changes: SimpleChanges) {
    this.ringStroke = Math.floor(3.15 * this.Timer.ring) + "px, 315px"
  }
  TimerBtn(timer: string, id: string, status: TASK_STATUS) {
    if (id === "-1") {
      this.PopUp(0)
    } else {
      if (status === TASK_STATUS.IN_PROGRESS) {
        this.TaskArr.TaskSelector(id, timer, TASK_STATUS.PAUSED)
      }else {
        this.TaskArr.TaskSelector(id, timer, TASK_STATUS.IN_PROGRESS)
      }
    }
  }
  PopUp(I: number) {
    if (I === 4) {
      this.PopClass = false
    } else {
      this.PopClass = true
      setTimeout(() => this.PopUp(I + 1), 1000)
    }
  }
}
