import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private accessTokenSubject = new BehaviorSubject<string | null>(this.getStoredAccessToken());

  baseUrl = 'http://148.251.86.36:8001';
  // baseUrl = 'http://localhost:3000';

  register(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, formData)
  }

  login(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, formData)
  }

  setAccessToken(name: string | null): void {
    localStorage.setItem('accessToken', name || '');
  }

  getAccessToken(): string | null {
    return this.accessTokenSubject.value;
  }

  setUserDetails(token: string | null): void {
    localStorage.setItem('username', token || '');
    this.accessTokenSubject.next(token);
  }

  getUserDetails(): string | null {
    return localStorage.getItem('username');
  }

  private getStoredAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.setAccessToken(null);
    localStorage.clear();
  }

}
