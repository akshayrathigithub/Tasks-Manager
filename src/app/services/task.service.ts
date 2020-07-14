import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Task } from "../modules/taskModule"

@Injectable({
  providedIn: "root",
})
export class TaskService {
  DummyArr = [
    {
      _id: "0",
      name: "Task-1",
      priority: "fas fa-arrow-alt-circle-down",
      totalTime: "00:10:00",
      leftTime: "00:10:00",
      active: false,
      status: "OnGoing",
      created: "14/7/2020",
    },
    {
      _id: "1",
      name: "Task-2",
      priority: "fas fa-arrow-alt-circle-down",
      totalTime: "00:10:00",
      leftTime: "00:10:00",
      active: false,
      status: "OnGoing",
      created: "14/7/2020",
    },
    {
      _id: "2",
      name: "Task-3",
      priority: "fas fa-arrow-alt-circle-down",
      totalTime: "00:10:00",
      leftTime: "00:10:00",
      active: false,
      status: "OnGoing",
      created: "14/7/2020",
    },
    {
      _id: "3",
      name: "Task-4",
      priority: "fas fa-arrow-alt-circle-down",
      totalTime: "00:10:00",
      leftTime: "00:10:00",
      active: false,
      status: "OnGoing",
      created: "13/7/2020",
    },
  ]

  ComponentSubject = new Subject<String>()
  Component$ = this.ComponentSubject.asObservable()
  TaskArrSubject = new Subject<object>()
  TaskArr$ = this.TaskArrSubject.asObservable()
  TaskSubject = new Subject<object>()
  Task$ = this.TaskSubject.asObservable()
  PopUpSubject = new Subject<object>()
  PopUp$ = this.PopUpSubject.asObservable()
  taskToTimer: Task
  TodayTasksList: Task[]
  ActiveTask: {
    taskid: string
    status: boolean
  } = {
    taskid: "-1",
    status: false,
  }

  constructor(private http: HttpClient) {
    this.getTasks()
    console.log("123")
  }

  setTask(Task: Task) {
    this.DummyArr.push(Task)
    this.getTasks()
    // this.http.post("http://localhost:1234/task-manager/create-task", Task).subscribe((res) => {
    //   this.getTasks()
    // })
  }

  getTasks() {
    // this.http.get("http://localhost:1234/task-manager/get-tasks").subscribe((res: any) => {
    // const TotalTasks = [...res.posts]
    let TotalTasks = [...this.DummyArr]
    let currTask = []
    let prevTask = []
    let lastWeekTask = []
    let lastMonthTask = []
    let YearTask = []
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    TotalTasks.forEach((task) => {
      let DateInfo = task.created.split("/")
      let TaskDay = parseInt(DateInfo[0])
      let TaskMonth = parseInt(DateInfo[1])
      let TaskYear = parseInt(DateInfo[2])
      if (TaskDay === day && TaskMonth === month && TaskYear === year) {
        currTask.push(task)
      } else {
        prevTask.push(task)
        if (TaskYear === year) {
          YearTask.push(task)
          if (TaskMonth === month) {
            lastMonthTask.push(task)
            if (day <= 7) {
              if (TaskDay >= 1 && TaskDay <= day) {
                lastWeekTask.push(task)
              }
            } else {
              if (TaskDay >= day - 7 && TaskDay <= day) {
                lastWeekTask.push(task)
              }
            }
          }
        }
      }
    })
    setTimeout(() => {
      this.TaskArrSubject.next({
        CurrentTasks: currTask,
        PreviousTasks: prevTask,
        LastWeekTasks: lastWeekTask,
        LastMonthTasks: lastMonthTask,
        LastYearTasks: YearTask,
      })
    }, 30)
    this.TodayTasksList = [...currTask]
    // })
  }

  getActiveTask() {
    return this.ActiveTask
  }

  TaskSelector(id: string, time: string, status: boolean) {
    this.taskToTimer = this.TodayTasksList.filter((task) => task._id === id)[0]
    if (time === "0") {
      null
    } else {
      if (time === "00:00:00") {
        null
      } else {
        this.taskToTimer.leftTime = time
      }
    }
    this.taskToTimer.active = !status
    this.ActiveTask.status = !status
    this.ActiveTask.taskid = id
    this.TaskSubject.next(this.taskToTimer)
  }

  ModalSelector(modal: string, Task: Task) {
    if ((modal = "fa-trash fas")) {
      this.PopUpSubject.next({ status: "RemoveTask", task: Task })
    } else {
      this.PopUpSubject.next({ status: "CompleteTask", task: Task })
    }
  }

  getTaskDeleted(id: string) {
    // let Id: object = { key: id }
    // this.http.post("http://localhost:1234/task-manager/delete-task", Id).subscribe((res) => {
    //   this.getTasks()
    // })

    this.DummyArr.splice(parseInt(id), 1)
    this.getTasks()
  }

  getTaskUpdated(task: Task) {
    this.http.post("http://localhost:1234/task-manager/update-task", task).subscribe((res) => {
      console.log(res)
    })
  }
  ComponentSelector(component: string) {
    this.ComponentSubject.next(component)
  }
}
