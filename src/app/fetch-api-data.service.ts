import { Injectable } from '@angular/core';

// Create angular service to consuming REST API
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
*  Declaring the api url that will provide data for the client app.
*/
const apiUrl = 'https://documentality.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params.
  // This will provide HttpClient to the entire class, making it available via this.http
  /** 
  * @param http
  */
  constructor(private http: HttpClient) {}

  /**
  * Making the api call for the user registration endpoint
  * @param userData 
  * @returns
  */
  public userRegistration(userData: any): Observable<any> {
    // console.log(userData);
    return this.http
    .post(apiUrl + 'users', userData)
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

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  /**
  * @param http
  */
  constructor(private http: HttpClient) {}

  /**
  * Allows a user to log in to their account.
  * @param userData
  * @returns
  */
  public userLogin(userData: any): Observable<any> {
    console.log(userData);
    return this.http
    .post(apiUrl + 'login', userData)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + 
        `Error body is: ${error.error}`
      );
    }
    return throwError('Invalid username or password.  Please try again.');
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetAllDocumentariesService {
  // Inject the HttpClient module to the constructor params.
  // This will provide HttpClient to the entire class, making it available via this.http
  /** 
  * Allows a user to get all documentaries endpoint.
  * @param http
  * @returns 
  */
  constructor(private http: HttpClient) {}

  /**
  * Allows a user to get all documentaries endpoint.
  * @returns
  */
  getAllDocumentaries(): Observable<any> {
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

 @Injectable({
  providedIn: 'root',
})
export class GetSingleMovieService {
  /** 
  * @param http
  */
  constructor(private http: HttpClient) {}
  /**
  * Returns from the Api a single documentary information
  * @return  
  */
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


@Injectable({
  providedIn: 'root',
})
export class GetDirectorService {
  /** 
  * @param http
  */
  constructor(private http: HttpClient) {}
  /**
  * Returns director's information by name.
  * @return
  */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'directors/:Name', { 
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

@Injectable({
  providedIn: 'root',
})
export class GetGenreService {
  /** 
  * @param http
  */
  constructor(private http: HttpClient) {}
  /**
  * Returns the api call to get genre information.
  * @return
  */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'genres/:Name', {
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

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  /** 
  * @param http
  */
  constructor(private http: HttpClient) {}
  /**
  * Returns a user's information by username
  * @returns
  */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .get(apiUrl + `users/${username}`, {
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

@Injectable({
  providedIn: 'root',
})
export class GetFavoriteMoviesService {
  /** 
  * @param http
  */
  constructor(private http: HttpClient) {}

  /**
  * Returns a user's favorite movies by username.
  * @returns
  */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .get(apiUrl + `users/${username}/documentaries`, {
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

@Injectable({
  providedIn: 'root',
})
export class AddFavoriteMovieService {
  /** 
  * @param http
  */
  constructor(private http: HttpClient) {} 
  /**
  * Adds a favorite documentary to a user's favorite list.
  * @param id type: string - Documentary Id
  */
  addFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .post(apiUrl + `users/${username}/documentaries/${id}`, id,
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

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  /** 
  * @param http
  */
  constructor(private http: HttpClient) {}

  /**
  * Allows a user to update their information.
  * @param userData
  */
  editUser(userData: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .put(apiUrl + `users/${username}`, userData, {
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

@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  /** 
  * @param http
  */
  constructor(private http: HttpClient) {}
  /**
  * DeleteUserService Class allows a user to delete their account.
  * @returns
  */
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text', // This line prevent that HttpErrorResponse will throw 'unknown identifier' error.

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

@Injectable({
  providedIn: 'root',
})
export class DeleteFavoriteMovieService {
  /** 
  * @param http
  */
  constructor(private http: HttpClient) {}
  /**
  * Allows a user to remove a movie from their favorite's list
  * @param id type: string - Documentary Id
  */
  deleteFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .delete(apiUrl + `users/${username}/documentaries/${id}`, { // 'users/:Username/documentaries/:id', 
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