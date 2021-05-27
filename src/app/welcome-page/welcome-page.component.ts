import { Component, OnInit } from '@angular/core';

// Angular Materials
import { MatDialog } from '@angular/material/dialog';

// Components
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  
  /**
  * @param dialog
  */
  constructor(public dialog: MatDialog) {}
  
  ngOnInit(): void {}
  
  /**
  * Opens the dialog when the sign up button is clicked  
  */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'  // Assigning the dialog a width
    });
  }

  /**
  * Opens dialog showing user login dialog
  */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginComponent, {
      width: '280px'
    });
  }
}