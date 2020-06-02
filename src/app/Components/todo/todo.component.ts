import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Task } from 'src/app/modules/taskModule';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  Tasks: Task[]
  Rows: number
  ActiveTask: string = ''
  PopClass: boolean = false
  @Output() task = new EventEmitter()
  @Input() Timer: any
  constructor(private TaskArr: TaskService) { 
  }

  ngOnInit(): void {
    this.Tasks = this.TaskArr.getTasks()
    this.Rows = 1+this.Tasks.length
  }
  Called(){
    this.task.emit("CreateTask")
  }
  Span(index: number){
    return `${index+2}/1/${index+3}/5`
  }
  SetTime(id: number, time: string, status: boolean){
    let task = this.TaskArr.getActiveTask()
    if(task.status){
      if(task.taskid === id){
        this.TaskArr.TaskSelector(id, time, status)
      }else{
        this.PopUp(0)
      }
    }else{
      this.TaskArr.TaskSelector(id, time='0', status)
    }
  }
  PopUp(I: number){
    if(I === 4){
      this.PopClass = false
    }else{
      this.PopClass = true
      setTimeout( () => this.PopUp(I+1) , 1000);
    }
  }
  SetActiveTask(taskname: string, id: number){
    this.ActiveTask = taskname
  }
  ModalCalled(icon: any){
    this.TaskArr.ModalSelector(icon.attributes[2].value)
  }
}
