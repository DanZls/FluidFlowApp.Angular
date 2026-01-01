import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModelListComponent } from './model-list/model-list.component';
import { ModifyingBoardComponent } from './modifying-board/modifying-board.component';
import { CommonModule } from '@angular/common';
import { LogListComponent } from './log-list/log-list.component';
import { TutorialComponent } from './tutorial/tutorial.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    LogListComponent,
    ModifyingBoardComponent, 
    ModelListComponent,
    TutorialComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "flow-app-client";
}
