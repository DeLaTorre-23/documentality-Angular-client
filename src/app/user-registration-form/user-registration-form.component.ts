import { Component, OnInit, Input } from '@angular/core';

// Angular Materials
import { MatDialogRef } from '@angular/material/dialog'; // You'll use this import to close the dialog on success
import { MatSnackBar } from '@angular/material/snack-bar';

// API calls
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
  * @param fetchApiData
  * @param dialogRef
  * @param snackBar
  */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}

  /**
  * Handles registering user account by contacting the API
  */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        this.dialogRef.close(); // This will close the modal on success!
        console.log(response);
        this.snackBar.open('Signed up successfully!', 'OK', {
          duration: 2000,
          verticalPosition: 'top',
        });
      }, 
      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      }
    );
  }

}