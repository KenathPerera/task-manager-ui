import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  showButtons = true;
  isLoggingOut = false;
  currentRoute = '';
  currentTheme: 'light' | 'dark' = 'light';

  constructor(private location: Location, private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      this.showButtons = this.currentRoute !== '/';

    });

    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    this.currentTheme = savedTheme ?? 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggingOut = false;
      }
    });
  }
  goBack() {
    this.location.back();
  }

  logout() {
    this.isLoggingOut = true;
    setTimeout(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }, 2000);

  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }
}
