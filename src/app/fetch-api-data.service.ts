import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://sarjohnsonmyflix-4f5de10aa490.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) { }
  private createAuthHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: 'Bearer ' + token });
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }
  public userLogin(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'login', userData).pipe(
      catchError(this.handleError)
    );
  }
  public getLoggedInUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.Username) {
      return this.getUser(user.Username);
    }
    return throwError('User not found');
  }
  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {headers: this.createAuthHeader() }).pipe(
      catchError(this.handleError)
    );
  }
  public getMovie(Title: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/' + Title, {headers: this.createAuthHeader() }).pipe(
      catchError(this.handleError)
    );
  }
  public getDirector(Name: string): Observable<any> {
    return this.http.get(apiUrl + 'director/' + Name, {headers: this.createAuthHeader() }).pipe(
      catchError(this.handleError)
    );
  }
  public getSubgenre(Name: string): Observable<any> {
    return this.http.get(apiUrl + 'subgenre/' + Name, {headers: this.createAuthHeader() }).pipe(
      catchError(this.handleError)
    );
  }
  public getUser(Username: string): Observable<any> {
    return this.http.get(apiUrl + 'users/' + Username, {headers: this.createAuthHeader() }).pipe(
      catchError(this.handleError)
    );
  }
  public editUser(Username: string, userData: any): Observable<any> {
    return this.http.put(apiUrl + 'users/' + Username, userData, {headers: this.createAuthHeader() }).pipe(
      catchError(this.handleError)
    );
  }
  public deleteUser(Username: string): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + Username, {headers: this.createAuthHeader() }).pipe(
      catchError(this.handleError)
    );
  }
  public addFavorite(Username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return this.http.post(`https://sarjohnsonmyflix-4f5de10aa490.herokuapp.com/users/${Username}/movies/${movieId}`, {}, { headers }).pipe(
      map(this.extractResponseData), 
      catchError(this.handleError)
    ).pipe(
      map((response: any) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.favorites.push(movieId);
        localStorage.setItem('user', JSON.stringify(user));
        return response;
      })
    );
  }
  public deleteFavorite(Username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return this.http.delete(`https://sarjohnsonmyflix-4f5de10aa490.herokuapp.com/users/${Username}/movies/${movieId}`, { headers }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    ).pipe(
      map((response: any) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const index = user.favorites.indexOf(movieId);
        if (index >=0) {
          user.favorties.splice(index, 1);
        }
        localStorage.setItem('user', JSON.stringify(user));
        return response;
      })
    );
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
