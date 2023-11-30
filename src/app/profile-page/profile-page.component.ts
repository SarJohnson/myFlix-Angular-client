import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

type User = {
  favorites: any; _id?: string, Username?: string, Password?: string, Email?: string, FavoriteMovies?: [] 
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User = {
    favorites: undefined
  }; //object representing user details including favorites

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }; //object representing user data for input
  favoriteMovies: any; 
  FavoriteMovies: any; //variable to store favorite movies
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { //lifecycle hook
   const user = this.getUser();
    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user; 
    this.userData = { 
      Username: user.Username || "",
      Email: user.Email || "",
      Password: "",
      Birthday: ""
    }
  }

  getUser(): User { //get user method
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.FavoriteMovies = response.filter(
        (m: { _id: any }) => this.user.favorites.indexOf(m._id) >= 0
      );
    });
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateUser(): void { //update user method
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      console.log(response)
      localStorage.setItem('user', JSON.stringify(response))
      this.user = response;
      this.snackBar.open('user updated!', 'OK', {
        duration: 2000
      })
    })
  }

  deleteUser(): void { //delete user method
    if (confirm('are you sure?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}