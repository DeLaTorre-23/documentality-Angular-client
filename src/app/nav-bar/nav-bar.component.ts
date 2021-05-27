import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

// Angular Materials
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  
  toggleTheme = new FormControl(false);

  /**
  * @param renderer
  * @param MatSlideToggleModule
  * @param snackBar
  * @param router
  */
  constructor(
    private renderer: Renderer2,
    public snackBar: MatSnackBar,
    public router: Router,
    public MatSlideToggleModule: MatSlideToggleModule
  ) {}

  
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

  /**
  * Handles conditional rendering of sub-nav bar
  */
  isAuth() {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * Clears username and token from local storage to log out user
  */
  logoutUser(): void {
    localStorage.clear(),
    this.router.navigate(['/welcome']),
    this.snackBar.open('Your are logged out.', 'OK', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
  
  /**
  * Navigates user to profile-view from the menu bar
  */
  openProfile(): void {
    this.router.navigate(['/profile']);
  }
  
  /**
  * Navbar logo takes logged in user to movies page or welcome page if not logged in
  */
  backToMain(): void {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/documentaries']);
    } else {
      this.router.navigate(['/welcome']);
    }
  }

  /**
  * Navigates user to documentaries from the menu bar
  */
  toDocumentaries(): void {
    this.router.navigate(['/documentaries']);
  }
}