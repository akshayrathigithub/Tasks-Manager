import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PRIORITY, Task } from 'src/app/modules/taskModule';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-prev-tasks',
  templateUrl: './prev-tasks.component.html',
  styleUrls: ['./prev-tasks.component.css']
})
export class PrevTasksComponent implements OnInit {

  Rows: number
  ActiveTask: string = ''
  SearchedTaskName: string = ''
  toggle: boolean = false
  FilterStatus: string = "Filter"
  FilterIcon: string = "fas fa-chevron-down"
  @Input() Tasks: Task[];
  High = "fas fa-arrow-alt-circle-up"
  Med = "fas fa-arrow-alt-circle-right"
  Low = "fas fa-arrow-alt-circle-down"
  textChanged: Subject<string> = new Subject<string>();
  prevTasksList: Task[]
  
  constructor(private TaskArr: TaskService) {
    this.textChanged.pipe(
      debounceTime(300), 
      distinctUntilChanged())
      .subscribe(text => {
        this.filterTasks(text)
      });
   }

  ngOnInit(): void {
    this.Rows = 1+this.Tasks.length
    this.prevTasksList = [...this.Tasks]
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
    this.filterTasks(this.SearchedTaskName)
  }
  Delete(ID: string){
    this.TaskArr.getTaskDeleted(ID)
  }

  get PRIORITY(){
    return PRIORITY
  }

  inputChanged(text: string){
    this.textChanged.next(text);
  }

  filterTasks = (searchTerm: string) =>{
    let priority = PRIORITY.ALL
    if(this.FilterStatus === "High"){
      priority = PRIORITY.HIGH
    }else if(this.FilterStatus === "Medium"){
      priority = PRIORITY.MEDIUM
    }else if(this.FilterStatus === "Low"){
      priority = PRIORITY.LOW
    }
    this.TaskArr.filterTask(searchTerm, priority).subscribe((res: Task[]) => {
      this.prevTasksList = [...res]
    })
  }

}
