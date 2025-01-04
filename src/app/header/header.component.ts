import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HelperService } from '../services/helper.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isUserMenuOpen = false;
  isMenuOpen = false;
  router = inject(Router);
  helper = inject(HelperService);
  auth = inject(AuthService);

  toggleUserMenu(): void {
    if (this.auth.isLoggedIn()) {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    }
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeMenuOnOutsideClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.relative')) {
      this.isUserMenuOpen = false;
    }
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  logout() {
    this.auth.logout();
    this.navigateTo('login');
  }
}
