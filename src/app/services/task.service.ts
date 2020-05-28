import { Injectable } from '@angular/core';
import { Task } from '../modules/taskModule';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  task: Task[] = [{
    name: 'Task1',
    priority: 'fas fa-arrow-alt-circle-right',
    totalTime: '00:12:50',
    leftTime: '0',
    active: true
  },{
    name: 'Task2',
    priority: 'fas fa-arrow-alt-circle-right',
    totalTime: '01:12:50',
    leftTime: '0',
    active: false
  },{
    name: 'Task3',
    priority: 'fas fa-arrow-alt-circle-right',
    totalTime: '01:12:50',
    leftTime: '0',
    active: false
  },{
    name: 'Task4',
    priority: 'fas fa-arrow-alt-circle-right',
    totalTime: '01:12:50',
    leftTime: '0',
    active: false
  }
]
  taskToTimer: Task = this.task[0]

  constructor() {
    console.log("Task.service Called")
   }

  setTask(Task: any){
    this.task.push(Task)
  } 
  getTasks(){
    return this.task
  }
  TaskToTimer(){
    return this.taskToTimer
  }
  TaskSelector(id: number, time: string){
    this.taskToTimer = this.task[id]
    this.taskToTimer.leftTime = time
    console.log(this.taskToTimer)
  }
}
