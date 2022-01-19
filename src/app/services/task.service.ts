import { Injectable } from "@angular/core";
import { forkJoin, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API_URL, PRIORITY, Task, TASK_MANAGER_ANALTYICS, TASK_STATUS } from "../modules/taskModule";

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
    status: TASK_STATUS;
  } = {
    taskid: "-1",
    status: TASK_STATUS.NOT_STARTED,
  };

  constructor(private http: HttpClient) {
    this.getTasks();
  }

  setTask(Task: Task) {
    this.getTasks();
    // this.http.post("http://localhost:1234/task-manager/create-task", Task).subscribe((res) => {
    //   this.getTasks()
    // })
  }

  getTasks() {
    const onGoingTask = API_URL.BASE + API_URL.FETCH_TASKS
    const preTask = API_URL.BASE + API_URL.FETCH_PREV_TASKS
    forkJoin(this.http.get(onGoingTask), this.http.get(preTask)).subscribe(([currTask, prevTask]: [Task[], Task[]]) => {
      this.TodayTasksList = [...currTask];
      const onGoingTask = [...currTask];
      onGoingTask[0].status = TASK_STATUS.NOT_STARTED;
      this.ActiveTask.taskid = onGoingTask[0]._id;
      this.ActiveTask.status = onGoingTask[0].status;
          setTimeout(() => {
      this.TaskArrSubject.next({
        CurrentTasks: onGoingTask,
        PreviousTasks: prevTask,
      });
    }, 30);
    })
  }

  getActiveTask() {
    return this.ActiveTask;
  }

  TaskSelector(id: string, time: string, status: TASK_STATUS) {
    this.taskToTimer = this.TodayTasksList.find((task) => task._id === id);
    if (time === "0" || time === "00:00:00") {
      } else {
        this.taskToTimer.timeLeft = time;
      }
    this.taskToTimer.status = status;
    this.ActiveTask.status = status;
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
    // let Id: object = { key: id }
    // this.http.post("http://localhost:1234/task-manager/delete-task", Id).subscribe((res) => {
    //   this.getTasks()
    // })

    this.getTasks();
    this.PopUpSubject.next({ status: "RemoveTask" });
  }

  ComponentSelector(component: string) {
    this.ComponentSubject.next(component);
  }

  filterTask(searchTerm: string, priority: PRIORITY){
    const url = API_URL.BASE + API_URL.FILTER_TASK
    const query = `?searchTerm=${searchTerm}&priority=${priority}`
    const endpoint = url + query
    return this.http.get(endpoint)
  }

  analytics(parameter: TASK_MANAGER_ANALTYICS, priority: PRIORITY){
    const url = API_URL.BASE + API_URL.ANALYTICS
    const query = `?parameter=${parameter}&priority=${priority}`
    const endpoint = url + query
    return this.http.get(endpoint)
  }
}
