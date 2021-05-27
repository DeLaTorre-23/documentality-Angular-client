import { Component, OnInit } from '@angular/core';

// Angular Materials
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// API calls
import {
  GetAllDocumentariesService,
  GetUserService,
  AddFavoriteMovieService,
  DeleteFavoriteMovieService,
} from '../fetch-api-data.service';

// Components
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  
  documentaries: any[] = [];
  favoriteDocumentary: any[] = [];
  favoriteDocumentaryId: any[] = [];
  
  /**
  * @param fetchApiData
  * @param fetchApiDataUser
  * @param fetchApiDataFavoriteMovies
  * @param fetchApiDataDeleteFavorite
  * @param dialog
  * @param snackBar
  */
  constructor(
    public fetchApiData: GetAllDocumentariesService,
    public fetchApiDataUser: GetUserService,
    public fetchApiDataFavoriteMovies: AddFavoriteMovieService,
    public fetchApiDataDeleteFavorite: DeleteFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  /**
  * getDocumentaries() & getFavoriteMovies() function are run on initialization
  */
  ngOnInit(): void {
    this.getDocumentaries();
    this.getFavoriteMovies();
  }

  /**
  * Retrieves list of all movies from database
  * @returns documentaries
  */
  getDocumentaries(): void {
    this.fetchApiData.getAllDocumentaries().subscribe((response: any) => {
      this.documentaries = response;
      console.log(this.documentaries);
      return this.documentaries;
    });
  }

  /**
  * Get user's favorite documentaries
  * @returns favoriteDocumentaryId - IDs of user's favorite documentaries
  */
   getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiDataUser.getUser().subscribe((response: any) => {
        this.favoriteDocumentaryId = response.FavoriteList;
        return this.favoriteDocumentaryId;
      });
    }
  }
  
  /**
  * Adds or removes documentary from user's favorite list
  * @param id type: string - Documentary Id
  * @param title type: string - Documentary Title
  */
  onToggleFavoriteMovie(id: string, Title: string): any {
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
      this.fetchApiDataFavoriteMovies.addFavoriteMovie(id).subscribe((resp: any) => {
        this.snackBar.open(`${Title} has been added to your favorites.`, 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      });
    }
    return this.favoriteDocumentaryId.push(id);
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
    });
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
  * @param death  type: string - Director´s death date
  */
   openDirector(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth, death },
      width: '350px'
    });
  }  
}



