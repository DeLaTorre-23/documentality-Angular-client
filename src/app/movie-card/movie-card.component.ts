// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GetAllDocumentariesService } from '../fetch-api-data.service';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';

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
}



