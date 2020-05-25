import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { TodoComponent } from './Components/todo/todo.component';
import { TimerComponent } from './Components/timer/timer.component';
import { CreateTaskComponent } from './Components/create-task/create-task.component';
import { MainComponent } from './Components/main/main.component';
import { FormsModule} from '@angular/forms';
import { AnalyticsComponent } from './Components/analytics/analytics.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoComponent,
    TimerComponent,
    CreateTaskComponent,
    MainComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
