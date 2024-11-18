import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  currentTab: 'login' | 'signup' = 'login';

  loginData = {
    email: '',
    password: '',
  };

  signUpData = {
    fullName: '',
    email: '',
    password: '',
  };

  setTab(tab: 'login' | 'signup'): void {
    this.currentTab = tab;
  }

  onLogin(): void {
    console.log('Login Data:', this.loginData);
    // Giriş işlemini burada yapabilirsiniz
  }

  onSignUp(): void {
    console.log('Sign Up Data:', this.signUpData);
    // Kayıt işlemini burada yapabilirsiniz
  }
}
