import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private TaskArr: TaskService) { }

  ngOnInit(): void {
  }
  
  Called(){
    this.TaskArr.ComponentSelector("CreateTask")
  }
}
