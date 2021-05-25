// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import {
  GetAllDocumentariesService,
  GetUserService,
  AddFavoriteMovieService,
  DeleteFavoriteMovieService,
} from '../fetch-api-data.service';

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
  
  constructor(
    public fetchApiData: GetAllDocumentariesService,
    public fetchApiDataUser: GetUserService,
    public fetchApiDataFavoriteMovies: AddFavoriteMovieService,
    public fetchApiDataDeleteFavorite: DeleteFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getDocumentaries();
    
  }

  /**
  * Function that retrieves list of all movies from database
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
    });
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
        this.favoriteDocumentaryId = response.FavoriteDocumentary;
        return this.favoriteDocumentaryId;
      });
    }
    setTimeout(() => {
      this.getDocumentaries();
    }, 100);
  }
  
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
}



