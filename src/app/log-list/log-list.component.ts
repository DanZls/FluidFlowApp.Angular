import { Component, inject } from '@angular/core';
import { LogService } from '../services/log.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-log-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.css'
})
export class LogListComponent {
  logService: LogService = inject(LogService);
}
