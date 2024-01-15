import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  imageLinks: any = [];
  imageLoadError: boolean[] = [];
  userName: string | null = 'User'

  constructor(private service: DashboardService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserDetails();
    this.getImages();
  }

  getImages() {
    this.service.fetchImages().subscribe(response => {
      console.log(response);
      this.imageLinks = response;
    })
  }

  handleImageError(index: number) {
    this.imageLoadError[index] = true;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
