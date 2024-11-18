import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HelperService } from '../services/helper.service';

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

  // Menü aç/kapa işlevi
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Menü dışına tıklanınca kapatma
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
}
