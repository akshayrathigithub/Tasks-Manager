import { Injectable } from '@angular/core';
import { Task } from '../modules/taskModule';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  task: Task[] = [
    {
      index: 0,
      name: 'Task1',
      priority: 'fas fa-arrow-alt-circle-right',
      totalTime: '00:01:50',
      leftTime: '00:01:50',
      active: false,
    },
    {
      index: 1,
      name: 'Task2',
      priority: 'fas fa-arrow-alt-circle-right',
      totalTime: '00:02:50',
      leftTime: '00:02:50',
      active: false,
    }
  ];
  TaskSubject = new Subject<object>();
  Task$ = this.TaskSubject.asObservable();
  PopUpSubject = new Subject<string>();
  PopUp$ = this.PopUpSubject.asObservable();
  taskToTimer: Task = this.task[0];

  ActiveTask: {
    taskid: number;
    status: boolean;
  } = {
    taskid: -1,
    status: false,
  };

  constructor(private http: HttpClient) {}

  setTask(Task: any) {
    this.task.push(Task);
    this.http.post('http://localhost:1234/feed/post', Task).subscribe(res =>{ console.log(res)})
  }
  getTasks() {
    this.http.get('http://localhost:1234/feed/posts').subscribe(res =>{ console.log(res)})
    return this.task;
  }
  getActiveTask() {
    return this.ActiveTask;
  }
  TaskSelector(id: number, time: string, status: boolean) {
    this.taskToTimer = this.task[id];
    if(time === '0'){
      null
    }else{
      this.taskToTimer.leftTime = time;
    }
    this.taskToTimer.active = !status;
    this.ActiveTask.taskid = id
    this.ActiveTask.status = !status
    this.TaskSubject.next(this.taskToTimer);
  }
  ModalSelector(modal: string){
    if(modal = 'fas fa-check'){
      this.PopUpSubject.next('CompleteTask')
    }else{
      this.PopUpSubject.next('RemoveTask')
    }
  }
}
