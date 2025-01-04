import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule], // CommonModule dahil edildi
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  alertMessage: string | null = null;
  alertType: string = 'success';

  constructor(private alertService: AlertService) {
    this.alertService.alertMessage$.subscribe((message) => {
      this.alertMessage = message;
    });
    this.alertService.alertType$.subscribe((type) => {
      this.alertType = type;
    });
  }
}
