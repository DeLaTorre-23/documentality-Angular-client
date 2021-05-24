import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// Used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  EditUserService,
  GetAllDocumentariesService,
  GetUserService,
  GetFavoriteMoviesService,
  DeleteUserService,
  DeleteFavoriteMovieService,
  AddFavoriteMovieService
} from '../fetch-api-data.service';
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

  constructor(
    public fetchApiData: EditUserService,
    public fetchApiDataAllMovies: GetAllDocumentariesService,
    public fetchApiDataUser: GetUserService,
    public fetchApiDataFavoriteMovies: GetFavoriteMoviesService,
    public fetchApiDataDeleteUser: DeleteUserService,
    public fetchApiDataDeleteFavorite: DeleteFavoriteMovieService,
    public fetchApiDataAddFavoriteMovies: AddFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    /**
     * Call function on page load to retrieve a list of user's favorite movies
     */
    this.getFavoriteMovies();
  }
  
  /**
   * Function that retrieves list of all movies from database
   * then checks for favorite movie ids against this list.
   * If a match, movie is pushed to favoriteMovies array.
   * @returns favoriteMovies
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
  * Function to open dialog showing documentary details
  * @param Description type: string - Movie description
  * @param Image type: string - Path to movie image
  * @param Title type: string - Movie title
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
  * Function to open dialog showing genre dialog
  * @param name
  * @param description
  */
   openGenre(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
      width: '400px'
    });
  }

  /**
   * Function to open dialog showing director dialog
   * @param name
   * @param bio
   * @param birth
   * @param death
   */
   openDirector(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth, death },
      width: '350px'
    });
  }

  /**
  * Function to get user's favorite movies
  * @returns favoriteMovieIDs - IDs of user's favorite movies
  */
   getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiDataUser.getUser().subscribe((response: any) => {
        this.favoriteDocumentaryId = response.favoriteDocumentary;

       /* if (this.favoriteDocumentaryId.length === 0) {
          let noFavorites = document.querySelector(
            '.no-favorites'
          ) as HTMLDivElement;
          noFavorites.innerHTML = "You don't have any favorite documentary!";
        }*/

        return this.favoriteDocumentaryId;
      });
    }
    setTimeout(() => {
      this.getDocumentaries();
    }, 100);
  }

/**
   * Adds or removes movie from user's list of favorites
   * @param id
   * @returns
   */
  onToggleFavoriteMovie(id: string): any {
    const Title = localStorage.getItem('Title');
    if (this.favoriteDocumentaryId.includes(id)) {
      this.fetchApiDataDeleteFavorite.deleteFavoriteMovie(id).subscribe((resp: any) => {
        this.snackBar.open(`${Title} has been removed from your favorites.`, 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      });
      const index = this.favoriteDocumentaryId.indexOf(id);
      return this.favoriteDocumentaryId.splice(index, 1);
    } else {
      this.fetchApiDataAddFavoriteMovies.addFavoriteMovie(id).subscribe((resp: any) => {
        this.snackBar.open('The documentary has been added to your favorites.', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      });
    }
    return this.favoriteDocumentaryId.push(id);
  }

  /**
  * Function that deletes a movie from user's list of favorites.
  * The class "active" is removed from the movie that has been deleted,
  * and the class "delete" is added so the card is not displayed.
  * The checkNoFavorites function is called.
  * @param id type: string - ID of movie to be deleted from favorites
  * @param Title type: string - Title of movie to be deleted from favorites
  * @param i type: number - index of movie
  */
  deleteFavoriteMovies(id: string, Title: string, i: number): void {
    this.fetchApiDataDeleteFavorite
      .deleteFavoriteMovie(id)
      .subscribe((resp: any) => {
        this.snackBar.open(
          `${Title} has been removed from your favorites.`,
          'OK',
          {
            duration: 3000,
            verticalPosition: 'top',
          }
        );
        console.log(resp);

        let cards = document.querySelectorAll('.card');
        let tempCards = Array.from(cards);

        tempCards[i].classList.remove('active');
        tempCards[i].classList.add('delete');

        this.checkNoFavorites();
      }
    );
  }
  
  /**
  * Function that checks whether a user no longer has favorite movies after
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
   * Function that allows the user to update their profile information
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
            this.router.navigate(['user']).then(() => {
              window.location.reload();
            }),
          1500
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
  * Function that allows the user to delete their profile
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
        // Logs user out
        localStorage.clear();
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
       
        // Refreshes and redirects to welcome view
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      }
    );
  }


}
