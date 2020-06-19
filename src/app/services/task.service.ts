import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Task } from "../modules/taskModule";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  ComponentSubject = new Subject<String>();
  Component$ = this.ComponentSubject.asObservable();
  TaskArrSubject = new Subject<object>();
  TaskArr$ = this.TaskArrSubject.asObservable();
  TaskSubject = new Subject<object>();
  Task$ = this.TaskSubject.asObservable();
  PopUpSubject = new Subject<object>();
  PopUp$ = this.PopUpSubject.asObservable();
  taskToTimer: Task;
  TodayTasksList: Task[];
  ActiveTask: {
    taskid: string;
    status: boolean;
  } = {
    taskid: "-1",
    status: false,
  };

  constructor(private http: HttpClient) {
    this.getTasks();
  }

  setTask(Task: Task) {
    this.http
      .post("http://localhost:1234/task-manager/create-task", Task)
      .subscribe((res) => {
        this.getTasks();
      });
  }

  getTasks() {
    this.http
      .get("http://localhost:1234/task-manager/get-tasks")
      .subscribe((res: any) => {
        const TotalTasks = [...res.posts]
        let currTask = []
        let prevTask = []
        let currDay = new Date()
        TotalTasks.forEach(task =>{
          if(task.created === currDay.toDateString()){
            currTask.push(task)
          }else{
            prevTask.push(task)
          }
        })
        this.TaskArrSubject.next({ CurrentTasks: currTask, PreviousTasks: prevTask });
        this.TodayTasksList = [...currTask];
      });
    return [];
  }

  getActiveTask() {
    return this.ActiveTask;
  }

  TaskSelector(id: string, time: string, status: boolean) {
    this.taskToTimer = this.TodayTasksList.filter((task) => task._id === id)[0];
    if (time === "0") {
      null;
    } else {
      if (time === "00:00:00") {
        null;
      } else {
        this.taskToTimer.leftTime = time;
      }
    }
    this.taskToTimer.active = !status;
    this.ActiveTask.status = !status;
    this.ActiveTask.taskid = id;
    this.TaskSubject.next(this.taskToTimer);
  }

  ModalSelector(modal: string, Task: Task) {
    if ((modal = "fa-trash fas")) {
      this.PopUpSubject.next({ status: "RemoveTask", task: Task });
    } else {
      this.PopUpSubject.next({ status: "CompleteTask", task: Task });
    }
  }

  getTaskDeleted(id: string) {
    let Id: object = { key: id };
    this.http
      .post("http://localhost:1234/task-manager/delete-task", Id)
      .subscribe((res) => {
        this.getTasks();
      });
  }

  getTaskUpdated(task: Task) {
    this.http
      .post("http://localhost:1234/task-manager/update-task", task)
      .subscribe((res) => {
        console.log(res);
      });
  }
  ComponentSelector(component: string) {
    this.ComponentSubject.next(component);
  }
}
