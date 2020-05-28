import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() Timer: any
  ringStroke:string;
  TaskName: string
  constructor() {
    console.log("Timer Component Called")
  }
  ngOnInit(): void {
    this.TaskName = this.Timer.task
  }
  ngOnChanges(changes: SimpleChanges) {
    this.ringStroke = Math.floor(3.15*this.Timer.ring) + 'px, 315px'
  }
}
