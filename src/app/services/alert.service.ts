import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertMessageSubject = new BehaviorSubject<string | null>(null); // Mesajı tutar
  private alertTypeSubject = new BehaviorSubject<string>('success'); // Alert türünü tutar (success, error, warning)

  alertMessage$ = this.alertMessageSubject.asObservable();
  alertType$ = this.alertTypeSubject.asObservable();

  constructor() {}

  // Alert mesajını göster
  showAlert(
    message: string,
    type: 'success' | 'error' | 'warning' = 'success'
  ): void {
    this.alertMessageSubject.next(message);
    this.alertTypeSubject.next(type);

    // 5 saniye sonra alert'i gizle
    setTimeout(() => this.hideAlert(), 3000);
  }

  // Alert'i gizle
  hideAlert(): void {
    this.alertMessageSubject.next(null);
    this.alertTypeSubject.next('success');
  }
}
