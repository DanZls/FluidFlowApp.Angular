import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
    logs: string[] = [];
    unreadLogsNumber: number = 0;

    AddLog(log: string): void {
        this.logs.push(log);
        this.unreadLogsNumber += 1;
    }

    MarkAllAsRead(): void {
      this.unreadLogsNumber = 0;
    }
}
