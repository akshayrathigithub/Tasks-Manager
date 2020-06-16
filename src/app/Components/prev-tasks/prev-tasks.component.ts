import { Component, OnInit } from '@angular/core';
import { PrevTasksService } from 'src/app/services/prev-tasks.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-prev-tasks',
  templateUrl: './prev-tasks.component.html',
  styleUrls: ['./prev-tasks.component.css']
})
export class PrevTasksComponent implements OnInit {

  prevTasks: any ;
  Rows: number
  ActiveTask: string = ''
  SearchedTaskName: string
  toggle: boolean = false
  FilterStatus: string = "Filter"
  FilterIcon: string = "fas fa-chevron-down"
  
  constructor( private TaskArr: TaskService, private PrevTasksArr: PrevTasksService) { 
    this.TaskArr.TaskArr$.subscribe((res: any) => {
      console.log(res.posts);
    });
  }

  ngOnInit(): void {
    this.prevTasks = this.PrevTasksArr.getPrevTasks()
    this.Rows = 1+this.prevTasks.length
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
}
