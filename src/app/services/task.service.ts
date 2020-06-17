import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  ComponentSubject = new Subject<String>()
  Component$ = this.ComponentSubject.asObservable()
  TaskArrSubject = new Subject<object>()
  TaskArr$ = this.TaskArrSubject.asObservable()
  TaskSubject = new Subject<object>()
  Task$ = this.TaskSubject.asObservable()
  PopUpSubject = new Subject<object>()
  PopUp$ = this.PopUpSubject.asObservable()
  // taskToTimer: Task = this.task[0];

  ActiveTask: {
    taskid: number;
    status: boolean;
  } = {
    taskid: -1,
    status: false,
  };

  constructor(private http: HttpClient) {
    this.getTasks()
  }

  setTask(Task: any) {
    this.http.post('http://localhost:1234/task-manager/create-task', Task).subscribe(res =>{ 
      this.getTasks()
    })
  }

  getTasks() {
    this.http.get('http://localhost:1234/task-manager/get-tasks').subscribe(res =>{ 
      this.TaskArrSubject.next(res);
    })
    return []
  }

  getActiveTask() {
    return this.ActiveTask;
  }

  TaskSelector(id: string, time: string, status: boolean) {
    // this.taskToTimer = this.task[id];
    // if(time === '0'){
    //   null
    // }else{
    //   this.taskToTimer.leftTime = time;
    // }
    // this.taskToTimer.active = !status;
    // this.ActiveTask.taskid = id
    // this.ActiveTask.status = !status
    // this.TaskSubject.next(this.taskToTimer);
  }

  ModalSelector(modal: string, id: string){
    if(modal = 'fas fa-check'){
      this.PopUpSubject.next({status:'CompleteTask', _id: id })
    }else{
      this.PopUpSubject.next({status: 'RemoveTask', _id: id})
    }
  }

  getTaskDeleted(id: string){
    this.http.post('http://localhost:1234/task-manager/delete-task', id).subscribe(res =>{ console.log(res)})
  }

  getTaskUpdated(task){
    this.http.post('http://localhost:1234/task-manager/update-task', task).subscribe(res =>{ console.log(res)})
  }
  ComponentSelector(component: string){
    this.ComponentSubject.next(component)
  }
}
