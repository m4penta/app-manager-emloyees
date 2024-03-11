import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LocalStorageService } from './services/localStorage.services';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule,RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-manager-emloyes';
  constructor(
    private _router : Router,
    private _localStorageServices: LocalStorageService,

  ) {}

  logout(): void{
    this._localStorageServices.removeItem('user')
  }
}
