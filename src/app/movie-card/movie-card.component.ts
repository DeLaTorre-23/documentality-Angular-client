// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { GetAllDocumentariesService } from '../fetch-api-data.service';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  documentaries: any[] = [];
  constructor(public fetchApiData: GetAllDocumentariesService) { }

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
}