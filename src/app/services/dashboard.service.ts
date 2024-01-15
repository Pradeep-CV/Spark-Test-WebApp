import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  // baseUrl = 'http://148.251.86.36:8001';
  baseUrl = 'http://localhost:3000';

  fetchImages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }
}
