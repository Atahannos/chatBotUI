import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userService = inject(UserService);
  router = inject(Router);
  auth = inject(AuthService);
  alert = inject(AlertService);
  currentTab: 'login' | 'signup' = 'login';

  loginData = {
    username: '',
    password: '',
  };

  signUpData = {
    username: '',
    email: '',
    password: '',
  };
  ngOnInit(): void {
    this.auth.logout();
  }
  setTab(tab: 'login' | 'signup'): void {
    this.currentTab = tab;
  }

  onLogin(): void {
    const recaptchaSiteKey = environment.recaptchaSiteKey; // Google reCAPTCHA Site Key

    // reCAPTCHA v3 token'ını oluştur
    (window as any).grecaptcha.ready(() => {
      (window as any).grecaptcha
        .execute(recaptchaSiteKey, { action: 'login' }) // Token oluştur
        .then((token: string) => {
          // Oluşturulan token'ı backend'e gönder
          this.userService.getCaptchaResult(token).subscribe(
            (recaptchaResponse: any) => {
              if (recaptchaResponse.success && recaptchaResponse.score > 0.5) {
                // reCAPTCHA doğrulaması başarılıysa login işlemini başlat
                this.userService.loginUser(this.loginData).subscribe(
                  (data) => {
                    if (data.access) {
                      this.auth.login(data.access);
                      this.alert.showAlert(
                        'Başarılı Bir Şekilde Giriş Yaptınız',
                        'success'
                      );
                      this.loginData.password = '';
                      this.loginData.username = '';
                      this.navigateTo('home');
                    }
                  },
                  (error) => {
                    // Login API Hatası
                    if (error.error && error.error.error) {
                      this.alert.showAlert(error.error.error, 'error');
                    } else {
                      this.alert.showAlert(
                        'Beklenmeyen bir hata oluştu:',
                        'error'
                      );
                    }
                  }
                );
              } else {
                // reCAPTCHA doğrulama başarısız
                this.alert.showAlert(
                  'reCAPTCHA doğrulaması başarısız, giriş engellendi.',
                  'error'
                );
              }
            },
            (error) => {
              console.error('reCAPTCHA Backend Hatası:', error);
              this.alert.showAlert(
                'reCAPTCHA doğrulaması sırasında backend hatası oluştu.',
                'error'
              );
            }
          );
        })
        .catch((error: any) => {
          console.error('reCAPTCHA Token Hatası:', error);
          this.alert.showAlert(
            'reCAPTCHA doğrulaması sırasında hata oluştu.',
            'error'
          );
        });
    });
  }

  hideAlert(): void {
    this.showLoginAlert = false;
    this.showRegisterAlert = false;
  }
  showLoginAlert = false;
  showRegisterAlert = false;
  onSignUp(): void {
    this.userService.createUser(this.signUpData).subscribe(
      (data) => {
        if (data.date_joined) {
          this.alert.showAlert(
            'Başarılı Bir Şekilde Kayıt Yaptınız',
            'success'
          );
          this.signUpData.email = '';
          this.signUpData.username = '';
          this.signUpData.password = '';

          this.setTab('login');
        }
      },
      (error) => {
        // Hata durumunu işleme
        if (error.error && error.error.error) {
          this.alert.showAlert(error.error.error, 'error');
        } else {
          this.alert.showAlert('Beklenmeyen bir hata oluştu:', 'error');
        }
      }
    );
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
