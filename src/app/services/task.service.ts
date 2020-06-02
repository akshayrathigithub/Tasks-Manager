import { Injectable } from '@angular/core';
import { Task } from '../modules/taskModule';
import { Subject } from 'rxjs';

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
    },
    {
      index: 2,
      name: 'Task3',
      priority: 'fas fa-arrow-alt-circle-right',
      totalTime: '00:01:00',
      leftTime: '00:01:00',
      active: false,
    },
    {
      index: 3,
      name: 'Task4',
      priority: 'fas fa-arrow-alt-circle-right',
      totalTime: '00:00:50',
      leftTime: '00:00:50',
      active: false,
    },
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

  constructor() {}

  setTask(Task: any) {
    this.task.push(Task);
  }
  getTasks() {
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
