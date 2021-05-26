// src/app/nav-bar/nav-bar.component.ts
import { Component, OnInit, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  
  toggleTheme = new FormControl(false);

  constructor(
    private renderer: Renderer2,
    public snackBar: MatSnackBar,
    public router: Router,
    public MatSlideToggleModule: MatSlideToggleModule
  ) {}

  // Handles logic for theme toggling
  ngOnInit() {
    this.toggleTheme.valueChanges.subscribe((toggleValue) => {
      if (toggleValue === true) {
        this.renderer.addClass(document.body, 'dark-theme');
        this.renderer.removeClass(document.body, 'light-theme');
      } else {
        this.renderer.addClass(document.body, 'light-theme');
        this.renderer.removeClass(document.body, 'dark-theme');
      }
    });
  }

  // Handles conditional rendering of sub-nav bar
  isAuth() {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * Function clears username and token from local storage to log out user
  */
  logoutUser(): void {
    localStorage.clear(),
    this.router.navigate(['/welcome']),
    this.snackBar.open('Your are logged out.', 'OK', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
  
  // Navigates user to profile-view
  openProfile(): void {
    this.router.navigate(['/profile']);
  }

  // Navbar logo takes logged in user to movies page or welcome page if not logged in
  backToMain(): void {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/documentaries']);
    } else {
      this.router.navigate(['/welcome']);
    }
  }

  toDocumentaries(): void {
    this.router.navigate(['/documentaries']);
  }

}