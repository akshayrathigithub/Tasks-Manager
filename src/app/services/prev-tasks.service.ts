import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrevTasksService {

  constructor() { 
    console.log("Prev-Task.service Called")
  }
  prevTasksList: any = [{
    name: 'Task1',
    priority: 'fas fa-arrow-alt-circle-right',
    totalTime: '00:12:50',
    date: '12/03/20',
    status: true
  },{
    name: 'Task2',
    priority: 'fas fa-arrow-alt-circle-right',
    totalTime: '00:12:50',
    date: '12/03/20',
    status: true
  },{
    name: 'Task3',
    priority: 'fas fa-arrow-alt-circle-right',
    totalTime: '00:12:50',
    date: '12/03/20',
    status: false
  },{
    name: 'Task4',
    priority: 'fas fa-arrow-alt-circle-right',
    totalTime: '00:12:50',
    date: '12/03/20',
    status: true
  },{
    name: 'Task5',
    priority: 'fas fa-arrow-alt-circle-right',
    totalTime: '00:12:50',
    date: '12/03/20',
    status: false
  }]
  getPrevTasks(){
    return this.prevTasksList
  }
}
