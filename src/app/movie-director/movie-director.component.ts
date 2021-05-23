import { Component, OnInit, Inject } from '@angular/core';

// Angular material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {

 /**
  * Injects director name, bio, birth and death into class
  * from movie-card for use in director-dialog
  * @param data
  */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
      birth: Date;
      death: Date;
    }
  ) { }

  ngOnInit(): void { }
}