import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Eğer kullanıcı giriş yapmışsa, login sayfasına gitmesine izin verme
      this.router.navigate(['/home']); // Ana sayfaya yönlendir
      return false;
    }
    return true; // Giriş yapmamışsa erişime izin ver
  }
}
