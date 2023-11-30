import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

const routes: Routes = [];

@NgModule({ 
  imports: [
    RouterModule.forRoot(routes), //configures the router with the provided routes
    HttpClientModule, //enables the usage of HTTP services in the application
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }