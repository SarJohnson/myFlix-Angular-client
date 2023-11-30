import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service' // fetching movie-related data
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = []; //an array to store movie data
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router) { }

    ngOnInit(): void { //lifecycle hook
      const user = localStorage.getItem('user');
      if (!user) {
        this.router.navigate(['welcome']);
        return;
      }
      this.getMovies();
    }
getMovies(): void { //get all movies method
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  openSubgenreDialog(Subgenre: any): void { //open subgenre dialog method
    this.dialog.open(MovieDialogComponent, {
      data: {
        title: Subgenre.Name,
        content: Subgenre.Description,
      }
    })
  }
  openWatchDialog(Price: any, Watch: any): void { //open watch dialog method
    this.dialog.open(MovieDialogComponent, {
      data: {
        title: Price,
        content: window.open(Watch),
      }
    })
  }
  openDirectorDialog(Director: any): void { //open dialog method
    this.dialog.open(MovieDialogComponent, {
      data: {
        title: Director.Name,
        content: Director.Birth,
      }
    })
  }
  addFavorite(id: string): void { //add favorite movie method
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('added to favorites', 'OK', {
        duration: 2000
      })
    });
  }
  isFavorite(id: string): boolean { 
    return this.fetchApiData.isFavoriteMovie(id)
  }
  removeFavorite(id: string): void { //remove favorite movie method
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('removed from favorites', 'OK', {
        duration: 2000
      })
    });
  }
}