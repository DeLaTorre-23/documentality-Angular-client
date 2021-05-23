import { Component, OnInit, Inject } from '@angular/core';

//Angular material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss']
})
export class MovieDescriptionComponent implements OnInit {
 /**
   * Injects movie title, imagePath, description, director and genre into class
   * from movie-card to use in details-dialog
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      imagePath: string;
      description: string;
      director: string;
      genre: string;
    }
    ) { }

  ngOnInit(): void { }
}