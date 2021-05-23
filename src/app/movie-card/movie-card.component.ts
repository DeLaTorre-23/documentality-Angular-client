// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GetAllDocumentariesService } from '../fetch-api-data.service';
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
  favoriteDocumentaryId: any[] = [];
  
  constructor(
    public fetchApiData: GetAllDocumentariesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getDocumentaries();
  }

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
}



