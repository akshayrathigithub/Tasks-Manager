import { Component, OnInit } from "@angular/core"
import { TaskService } from "../../services/task.service"
import { ConvertTimeService } from "src/app/services/convert-time.service"

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.css"],
})
export class CreateTaskComponent implements OnInit {
  Btn: string = "Sec_1"
  PriorityVar: string = "Normal"
  taskName: string = ""
  taskNameError: boolean = false;
  H_1: number = 0
  H_2: number = 0
  M_1: number = 0
  M_2: number = 0
  S_1: number = 5
  S_2: number = 0
  Task: any
  constructor(private task: TaskService, private timeService: ConvertTimeService) {}

  ngOnInit(): void {}

  BtnSelector(name: string) {
    this.Btn = name
  }

  taskNameChanged(event: Event){
    this.taskNameError = false
  }

  PrioritySelector(priority: string) {
    this.PriorityVar = priority
  }
  Increased() {
    if (this.Btn === "Hour_1" && this.H_1 < 9 && this.H_1 >= 0) {
      this.H_1 += 1
    } else if (this.Btn === "Hour_2" && this.H_2 < 9 && this.H_2 >= 0) {
      this.H_2 += 1
    } else if (this.Btn === "Min_1" && this.M_1 < 5 && this.M_1 >= 0) {
      this.M_1 += 1
    } else if (this.Btn === "Min_2" && this.M_2 < 9 && this.M_2 >= 0) {
      this.M_2 += 1
    } else if (this.Btn === "Sec_1" && this.S_1 < 5 && this.S_1 >= 0) {
      this.S_1 += 1
    } else if (this.Btn === "Sec_2" && this.S_2 < 9 && this.S_2 >= 0) {
      this.S_2 += 1
    } else {
      null
    }
  }

  Decreased() {
    if (this.Btn === "Hour_1" && this.H_1 <= 9 && this.H_1 > 0) {
      this.H_1 -= 1
    } else if (this.Btn === "Hour_2" && this.H_2 <= 9 && this.H_2 > 0) {
      this.H_2 -= 1
    } else if (this.Btn === "Min_1" && this.M_1 <= 5 && this.M_1 > 0) {
      this.M_1 -= 1
    } else if (this.Btn === "Min_2" && this.M_2 <= 9 && this.M_2 > 0) {
      this.M_2 -= 1
    } else if (this.Btn === "Sec_1" && this.S_1 <= 5 && this.S_1 > 0) {
      this.S_1 -= 1
    } else if (this.Btn === "Sec_2" && this.S_2 <= 9 && this.S_2 > 0) {
      this.S_2 -= 1
    } else {
      null
    }
  }
  Submit() {
    let priority: string = ""
    if(!this.taskName){
      this.taskNameError = true
      return;
    }
    if (this.PriorityVar === "Low") {
      priority = "fas fa-arrow-alt-circle-down"
    } else if (this.PriorityVar === "High") {
      priority = "fas fa-arrow-alt-circle-up"
    } else {
      priority = "fas fa-arrow-alt-circle-right"
    }
    let time: string = `${this.H_1}${this.H_2}:${this.M_1}${this.M_2}:${this.S_1}${this.S_2}`
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    this.Task = {
      name: this.taskName,
      priority: priority,
      active: false,
      totalTime: time,
      leftTime: time,
      status: "OnGoing",
      created: `${day}/${month}/${year}`,
    }
    this.task.setTask(this.Task)
    this.task.ComponentSelector("Task")
  }
}
