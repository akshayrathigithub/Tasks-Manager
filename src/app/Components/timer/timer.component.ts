import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() Timer: any
  ringStroke:string;
  constructor(private TaskArr: TaskService) {
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.ringStroke = Math.floor(3.15*this.Timer.ring) + 'px, 315px'
  }
}
