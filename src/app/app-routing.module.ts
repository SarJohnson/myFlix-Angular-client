import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'movies', component: MovieCardComponent},
  {path: '', redirectTo:'welcome', pathMatch:'prefix'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
