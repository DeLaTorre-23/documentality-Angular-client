// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// App Components Elements
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  
  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
  }
  
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