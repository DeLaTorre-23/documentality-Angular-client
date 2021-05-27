import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Angular Material Elements
import { MatDialogRef } from '@angular/material/dialog'; // You'll use this import to close the dialog on success
import { MatSnackBar } from '@angular/material/snack-bar'; // This import is used to display notifications back to the user

// API calls
import { UserLoginService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  /**
  * @param fetchApiData
  * @param dialogRef
  * @param snackBar
  * @param router
  */
  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
    
  ngOnInit(): void {}

  /**
  * This is the function responsible for sending the form inputs to the backend.
  * Its checks user login credentials against the server,
  * sends back a token if credentials are valid,
  * stores user and token in localStorage for later use
  */
  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        this.fetchApiData.userLogin(this.userData).subscribe((response) => {
        this.dialogRef.close(); // This will close the modal upon success
        console.log(response);
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        this.snackBar.open('Logged in successfully!', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.router.navigate(['documentaries']);
        },
        (response) => {
          console.log(response);
          this.snackBar.open('response', 'OK', {
            duration: 3000,
          });
        })
      }
    )
  }
}