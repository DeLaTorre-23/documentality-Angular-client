import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


// Declaring the api url that will provide data for the client app.
const apiUrl = 'https://documentality.herokuapp.com/';

// UserRegistrationService Class allows a user to register a new account.
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  /** 
  * Inject the HttpClient module to the constructor params.
  * This will provide HttpClient to the entire class, making it available via this.http
  * @param http
  */
  constructor(private http: HttpClient) {}
  /**
  * Making the api call for the user registration endpoint
  * @param userDetails 
  */
  public userRegistration(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http
    .post(apiUrl + 'users', userDetails)
    .pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}


/**
* UserLoginService Class allows a user to log in to their account.
* @param http
*/
 @Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  constructor(private http: HttpClient) {}

  /**
  * Making the api call to the user login endpoint.
  * @param userDetails
  */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'login', userDetails)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Invalid username or password.  Please try again.');
  }
}


/**
* GetAllMoviesService Class allows a user to get all movies endpoint.
* @param http
*/
@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) {}

  // Making the api call to get all movies.
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'documentaries', { 
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction.
  // private extractResponseData(res: Response | Object): any {
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
  
}

/**
* GetSingleMovieService Class returns a single movie by title.
*/
 @Injectable({
  providedIn: 'root',
})
export class GetSingleMovieService {
  constructor(private http: HttpClient) {}

  // Making the api call to get single movie information.
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'documentaries/:Title', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction.
  // private extractResponseData(res: Response | Object): any {
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
* GetDirectorService Class returns a director View by name.
*/
@Injectable({
  providedIn: 'root',
})
export class GetDirectorService {
  constructor(private http: HttpClient) {}
  
  // Making the api call to get director's information.
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'directors/:Name', { // 'movies/directors/:Name', 
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction.
  // private extractResponseData(res: Response | Object): any {
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
* GetGenreService Class returns a genre View by name.
*/
@Injectable({
  providedIn: 'root',
})
export class GetGenreService {
  constructor(private http: HttpClient) {}

  // Making the api call to get genre information.
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'genres/:Name', { // 'movies/genres/:Name', 
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction.
  // private extractResponseData(res: Response | Object): any {
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
* GetUserService returns a user by username.
*/
@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  constructor(private http: HttpClient) {}

  // Making the api call to get user information by username.
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'users/:Username', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction.
  // private extractResponseData(res: Response | Object): any {
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
* GetFavoriteMoviesService returns a user's favorite movies by username.
*/
@Injectable({
  providedIn: 'root',
})
export class GetFavoriteMoviesService {
  constructor(private http: HttpClient) {}

  /**
  * Making the api call to get a user's favorite movies.
  */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'users/:Username/Documentaries', { // 'users/:Username/movies', 
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction.
  // private extractResponseData(res: Response | Object): any {
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
* AddFavoriteMovieService Class adds a movie to the user's list of favorites
* @param http
*/
@Injectable({
  providedIn: 'root',
})
export class AddFavoriteMovieService {
  constructor(private http: HttpClient) {}

  /**
  * Making the api call to add a favorite movie to a user's favorite list.
  * @param title
  */
  addFavoriteMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .post(apiUrl + 'users/:Username/Documentaries/:Title',/* 'users/:Username/movies/:id', */ title, 
    {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction.
  // private extractResponseData(res: Response | Object): any {
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
* EditUserService Class allows a user to update their information.
* @param http
*/
@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  constructor(private http: HttpClient) {}

  /**
  * Making the api call to edit a user's information.
  * @param userDetails
  */
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .put(apiUrl + 'users/:Username', userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction.
  // private extractResponseData(res: Response | Object): any {
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
* DeleteUserService Class allows a user to delete their account.
* @param http
*/
@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  constructor(private http: HttpClient) {}

  // Making the api call to delete a user.
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .delete(apiUrl + 'users/:Username', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      // This line prevent that HttpErrorResponse will throw 'unknown identifier' error.
      responseType: 'text', 
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction.
  // private extractResponseData(res: Response | Object): any {
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
* DeleteFavoriteMovieService Class allows a user to remove a movie from their favorite's list
* @param http
*/
@Injectable({
  providedIn: 'root',
})
export class DeleteFavoriteMovieService {
  constructor(private http: HttpClient) {}

  /**
  * Making the api call to add a movie to a user's list of favorites.
  * @param title
  */
  deleteFavoriteMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .delete(apiUrl + 'users/:Username/Documentaries/:Title', { // 'users/:Username/movies/:id', 
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction.
  // private extractResponseData(res: Response | Object): any {
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
* This is necessary to prevent errors due to the "import { FetchApiDataService }... " in fetch-api-data.service.spec.ts file
*/
export class FetchApiDataService {
  constructor() {}
}