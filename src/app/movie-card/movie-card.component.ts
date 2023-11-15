import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MovieDetailDialogComponent } from '../movie-dialog/movie-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router) { }

    ngOnInit(): void {
      const user = localStorage.getItem('user');
      if (!user) {
        this.router.navigate(['welcome']);
        return;
      }
      this.getMovies();
    }
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  openSubgenreDialog(Subgenre: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: Subgenre.Name,
        content: Subgenre.Description,
      }
    })
  }
  openWatchDialog(Price: any, Watch: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: Price,
        content: window.open(Watch),
      }
    })
  }
  openDirectorDialog(Director: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: Director.Name,
        content: Director.Birth,
      }
    })
  }
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('added to favorites', 'OK', {
        duration: 2000
      })
    });
  }
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id)
  }
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('removed from favorites', 'OK', {
        duration: 2000
      })
    });
  }
}