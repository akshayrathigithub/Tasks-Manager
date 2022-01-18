import { Component, OnInit, Input } from "@angular/core"
import { PRIORITY, Task, TASK_STATUS } from "src/app/modules/taskModule"
import { TaskService } from "src/app/services/task.service"

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  Rows: number
  ActiveTask: string = ""
  PopClass: boolean = false
  @Input() Timer: any
  @Input() Tasks: Task[]
  High = "fas fa-arrow-alt-circle-up"
  Med = "fas fa-arrow-alt-circle-right"
  Low = "fas fa-arrow-alt-circle-down"

  constructor(private TaskArr: TaskService) {
  }

  ngOnInit(): void {}
  Called() {
    this.TaskArr.ComponentSelector("CreateTask")
  }

  Span(index: number) {
    return `${index + 2}/1/${index + 3}/5`
  }

  SetTime(id: string, time: string, status: TASK_STATUS) {
    let task = this.TaskArr.getActiveTask()
    console.log(task, id, "here")
    if (task.status === TASK_STATUS.IN_PROGRESS) {
      if (task.taskid === id) {
        this.TaskArr.TaskSelector(id, time, TASK_STATUS.PAUSED)
      } else {
        this.PopUp(0)
      }
    } else {
      this.TaskArr.TaskSelector(id, (time = "0"), TASK_STATUS.IN_PROGRESS)
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

  SetActiveTask(taskname: string, id: number) {
    this.ActiveTask = taskname
  }

  ModalCalled(icon: any, Task: Task) {
    this.TaskArr.ModalSelector(icon.attributes[2].value, Task)
  }

 get PRIORITY(){
    return PRIORITY
  }
}
