import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root', // Standalone olarak global kullanılabilir
})
export class UserService {
  auth = inject(AuthService);
  private baseUrl = 'http://127.0.0.1:8000/api/users/'; // API'nin temel URL'si
  private baseUrl2 = 'http://127.0.0.1:8000/api/querys/'; // API'nin temel URL'si
  private baseUrl3 = 'http://127.0.0.1:8000/api/responses/'; // API'nin temel URL'si

  constructor(private http: HttpClient) {}

  // Yeni kullanıcı oluştur (email, kullanıcı adı, şifre üzerinden)
  createUser(userData: {
    email: string;
    username: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(this.baseUrl, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Kullanıcı giriş (username ve password üzerinden)
  loginUser(credentials: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}login_user/`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getCaptchaResult(token: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}verify/`,
      { token },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }
  sendQuery(credentials: { user_query: string }): Observable<any> {
    const url = `${this.baseUrl2}send_query/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.authToken()}`,
    });

    return this.http.post<any>(
      url,
      credentials, // Gövdeye prompt'u ekliyoruz
      { headers }
    );
  }
  processResponse(credentials: { query_id: string }): Observable<any> {
    const url = `${this.baseUrl3}process_response/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.authToken()}`,
    });

    return this.http.post<any>(
      url,
      credentials, // Gövdeye prompt'u ekliyoruz
      { headers }
    );
  }
}
