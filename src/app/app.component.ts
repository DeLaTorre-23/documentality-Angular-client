// src/app/app.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginComponent } from './user-login/user-login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'documentality-Angular-client';

  constructor(public dialog: MatDialog) { }
  
  // This is the function that will open the dialog when the sign up button is clicked  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px'
    });
  }

  // This is the function that will open the dialog when the sign up button is clicked  
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginComponent, {
      // Assigning the dialog a width
      width: '280px'
    });
  }
}