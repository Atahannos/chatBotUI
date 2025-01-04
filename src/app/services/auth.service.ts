import { inject, Injectable, signal } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  authToken = signal<any>('');
  helper = inject(HelperService);

  login(token: any): void {
    this.authToken.set(token);
    this.isAuthenticated = true;
    this.helper.isLoggedIn.set(true);
  }

  logout(): void {
    this.isAuthenticated = false;
    this.authToken.set('');
    this.helper.isLoggedIn.set(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
