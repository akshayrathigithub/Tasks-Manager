import { Component, OnInit } from '@angular/core';
import { PrevTasksService } from 'src/app/services/prev-tasks.service';

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
  constructor(private PrevTasksArr: PrevTasksService) { }

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
}
