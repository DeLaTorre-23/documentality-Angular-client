import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Angular Materials
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// API calls
import {
  GetAllDocumentariesService,
  GetUserService,
  GetFavoriteMoviesService,
  EditUserService,
  AddFavoriteMovieService,
  DeleteUserService,
  DeleteFavoriteMovieService,
} from '../fetch-api-data.service';

// Components
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  
  documentaries: any[] = [];
  favoriteDocumentary: any[] = [];
  favoriteDocumentaryId: any[] = [];

  /**
  * @param fetchApiDataAllMovies
  * @param fetchApiDataUser
  * @param fetchApiDataFavoriteMovies
  * @param fetchApiData
  * @param fetchApiDataAddFavoriteMovies
  * @param fetchApiDataDeleteUser
  * @param fetchApiDataDeleteFavorite
  * @param dialog
  * @param snackBar
  * @param router
  */
  constructor(
    public fetchApiDataAllMovies: GetAllDocumentariesService,
    public fetchApiDataUser: GetUserService,
    public fetchApiDataFavoriteMovies: GetFavoriteMoviesService,
    public fetchApiData: EditUserService,
    public fetchApiDataAddFavoriteMovies: AddFavoriteMovieService,
    public fetchApiDataDeleteUser: DeleteUserService,
    public fetchApiDataDeleteFavorite: DeleteFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
  * Call function on page load to retrieve a list of user's favorite movies
  */
  ngOnInit(): void {
    this.getFavoriteMovies();
  }
  
  /**
  * It retrieves a list of all documentaries from database
  * then checks for favorite documentaries ids against this list.
  * If a match, documentary is pushed to favoriteDocumentaryId array.
  * @returns favoriteDocumentary
  */
  getDocumentaries(): void {
    this.fetchApiDataAllMovies.getAllDocumentaries().subscribe((response: any) => {
      this.documentaries = response;
      this.documentaries.forEach((documentary) => {
        if (this.favoriteDocumentaryId.includes(documentary._id))
          this.favoriteDocumentary.push(documentary);
      });
      return this.favoriteDocumentary;
    });
  }

  /**
  * Opens dialog showing documentary details
  * @param title type: string - Documentary title
  * @param image type: string - Path to movie image
  * @param description type: string - Documentary description
  * @param director type: string - Director of the documentary
  * @param genre type: string - Genre of the documentary
  */
  openDetails(
    title: string, 
    imagePath: string, 
    description: string, 
    director: string, 
    genre: string
    ): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { title, imagePath, description, director, genre },
      width: '400px',
    })
  }

  /**
  * Opens dialog showing genre information
  * @param name type: string - Name of genre
  * @param description type: string - Genre description
  */
  openGenre(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
      width: '400px'
    });
  }

  /**
  * Opens dialog showing director information
  * @param name  type: string - Director's name
  * @param bio  type: string - Director's biography
  * @param birth  type: string - Director's birth date
  * @param death  type: string - Director??s death date
  */
  openDirector(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth, death },
      width: '350px'
    });
  }

  /**
  * Get user's favorite documentaries list
  * @returns favoriteMovieIDs - IDs of user's favorite movies
  */
   getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
    const user = localStorage.getItem('user');
      this.fetchApiDataUser.getUser().subscribe((response: any) => {
        this.favoriteDocumentaryId = response.FavoriteList;
        console.log(this.favoriteDocumentaryId);
      });
    }
    setTimeout(() => {
      this.getDocumentaries();
    }, 100);
  }

  /**
  * Adds or removes documentary from user's favorite list
  * @param id type: string - Documentary Id
  * @param title type: string - Documentary Title
  */
  onToggleFavoriteMovie(id: string, Title: string, i: number): any {
    if (this.favoriteDocumentaryId.includes(id)) {
      this.fetchApiDataDeleteFavorite.deleteFavoriteMovie(id).subscribe((resp: any) => {
        this.snackBar.open(`${Title} has been removed from your favorites.`, 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
        console.log(resp);

        let cards = document.querySelectorAll('.card');
        let tempCards = Array.from(cards);

        tempCards[i].classList.remove('active');
        tempCards[i].classList.add('delete');

        this.checkNoFavorites();
      });
      const index = this.favoriteDocumentaryId.indexOf(id);
      return this.favoriteDocumentaryId.splice(index, 1);
    } else {
      this.fetchApiDataAddFavoriteMovies.addFavoriteMovie(id).subscribe((resp: any) => {
        this.snackBar.open(`${Title} has been added to your favorites.`, 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      });
    }
    return this.favoriteDocumentaryId.push(id);
  }
 
  /**
  * Function that checks whether a user no longer has favorite documentaries after
  * a favorite is deleted. If no cards remain with the "active" class, text
  * is displayed to let the user know they do not have any favorites.
  */
  checkNoFavorites() {
    let container = document.querySelector('.container') as HTMLDivElement;
    let noFavorites = document.querySelector('.no-favorites') as HTMLDivElement;
    if (container.querySelectorAll('.active').length < 1)
      noFavorites.innerHTML = "You don't have any favorite movies!";
  }  

  /**
  * Allows the user to update their profile information
  */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('user', result.username);
        this.snackBar.open('Your profile has been updated.', 'OK', {
          duration: 4000,
          verticalPosition: 'top',
        });
        setTimeout(
          () =>
            this.router.navigate(['profile']).then(() => {
              window.location.reload();
            }),
          1000
        );
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 5000,
          verticalPosition: 'top',
        });
      }
    );
  }

  /**
  * Allows the user to delete their profile
  */
  deleteUser(): void {
    this.fetchApiDataDeleteUser.deleteUser().subscribe(
      (resp: any) => {
        this.snackBar.open(
          'Your account has successfully been deleted!',
          'OK',
          {
            duration: 3000,
            verticalPosition: 'top',
          }
        );
        localStorage.clear(); // Logs user out
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });      
        this.router.navigate(['/welcome']).then(() => { // Refreshes and redirects to welcome view
          window.location.reload();
        });
      }
    );
  }
}