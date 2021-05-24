// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { Router } from '@angular/router';

import {
  //EditUserService,
  GetAllDocumentariesService,
  GetUserService,
  AddFavoriteMovieService,
  //GetFavoriteMoviesService,
  //DeleteUserService,
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
  //user: any[] = [];
  documentaries: any[] = [];
  favoriteDocumentary: any[] = [0];
  favoriteDocumentaryId: any[] = [];
  
  constructor(
    public fetchApiData: GetAllDocumentariesService,
    public fetchApiDataUser: GetUserService,
    public fetchApiDataFavoriteMovies: AddFavoriteMovieService,
    public fetchApiDataDeleteFavorite: DeleteFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

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
      this.fetchApiDataUser.getUser().subscribe((resp: any) => {
        this.favoriteDocumentaryId = resp.FavoriteDocumentary;
        return this.favoriteDocumentaryId;
      });
    }
    setTimeout(() => {
      this.getDocumentaries();
    }, 100);
  }

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
      this.fetchApiDataFavoriteMovies.addFavoriteMovie(id).subscribe((resp: any) => {
        this.snackBar.open('The documentary has been added to your favorites.', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      });
    }
    return this.favoriteDocumentaryId.push(id);
  }

  /**
  * Function that adds movie to user's list of favorites
  * @param id type: number - Movie ID
  * @param Title type: string - Movie Title
  *//*
 addToFavorites(id: string, Title: string): void {
  this.fetchApiDataFavoriteMovies.addFavoriteMovie(id).subscribe((resp: any) => {
    this.snackBar.open(`${Title} has been added to your favorites.`, 'OK', {
      duration: 3000,
      verticalPosition: 'top',
    });
    console.log(resp);

    //
    this.getFavoriteMovies();
    
  });

  setTimeout(() => {
    this.getDocumentaries();
  }, 200);
}*/

 /**
   * Function to delete a movie from user's list of favorites
   * @param id type: string - ID of movie to be deleted from favorites
   * @param Title type: string - Title of movie to be deleted from favorites
   *//*
  deleteFavoriteMovie(id: string, Title: string): void {
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

        this.getFavoriteMovies();
      });
  }*/



   /**
   * Adds or removes documentary from user's list of favorites
   *//*
    onToggleFavoriteMovie(id: string, Title: string): void {
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
    */

    /**
   * Adds or removes documentary from user's list of favorites
   *//*
    onToggleFavoriteMovie(id: string): any {
      if (this.favoriteDocumentaryId.includes(id)) {
        this.fetchApiDataDeleteFavorite.deleteFavoriteMovie(id).subscribe((resp: any) => {
          this.snackBar.open('Removed from favorites!', 'OK', {
            duration: 2000,
          });
        });
        const index = this.favoriteDocumentaryId.indexOf(id);
        return this.favoriteDocumentaryId.splice(index, 1);
      } else {
        this.fetchApiDataFavoriteMovies.addFavorite(id).subscribe((response: any) => {
          this.snackBar.open('Added to favorites!', 'OK', {
            duration: 2000,
          });
        });
      }
      return this.favoriteDocumentaryId.push(id);
    }
    */
}



