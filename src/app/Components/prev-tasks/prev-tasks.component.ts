import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/modules/taskModule';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-prev-tasks',
  templateUrl: './prev-tasks.component.html',
  styleUrls: ['./prev-tasks.component.css']
})
export class PrevTasksComponent implements OnInit {

  Rows: number
  ActiveTask: string = ''
  SearchedTaskName: string
  toggle: boolean = false
  FilterStatus: string = "Filter"
  FilterIcon: string = "fas fa-chevron-down"
  @Input() Tasks: Task[];
  
  constructor(private TaskArr: TaskService) { }

  ngOnInit(): void {
    this.Rows = 1+this.Tasks.length
  }
  Span(index: number){
    return `${index+2}/1/${index+3}/5`
  }
  DropDownClicked(){
    this.toggle = !this.toggle
  }
  SetFilterStatus(filter: string, icon: string){
    this.FilterStatus = filter
    this.FilterIcon = icon
    this.toggle = !this.toggle
  }
  Delete(ID: string){
    this.TaskArr.getTaskDeleted(ID)
  }
}
