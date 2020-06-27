import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { MovieComponent } from "./components/movie/movie.component";
import { NewMovieComponent } from "./components/new-movie/new-movie.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { MatButtonModule } from "@angular/material/button";
import { EditMovieComponent } from "./components/edit-movie/edit-movie.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { MatIconModule } from "@angular/material/icon";
import { PasswordValidatorDirective } from "./validators/password-validator.directive";
import { ConfirmAccountComponent } from "./components/confirm-account/confirm-account.component";
import { LoginComponent } from "./components/login/login.component";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from "./services/auth.guard";
import { HeaderComponent } from "./components/header/header.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
// ...
export function tokenGetter() {
  return localStorage.getItem("access_token");
}

const appRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "new-movie", component: NewMovieComponent, canActivate: [AuthGuard] },
  {
    path: "movie-details/:id",
    component: MovieDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit-movie/:id",
    component: EditMovieComponent,
    canActivate: [AuthGuard]
  },

  { path: "registration", component: RegistrationComponent },
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "confirm-account/:id", component: ConfirmAccountComponent },
  { path: "dashboard", component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    NewMovieComponent,
    MovieDetailsComponent,
    EditMovieComponent,
    RegistrationComponent,
    PasswordValidatorDirective,
    ConfirmAccountComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    //
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:8080"],
        blacklistedRoutes: [
          "localhost:8080/user/auth",
          "localhost:8080/user/create",
          "localhost:8080/user/confirm-account"
        ]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
