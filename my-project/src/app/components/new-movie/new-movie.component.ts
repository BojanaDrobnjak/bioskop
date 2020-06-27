import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormControl, Validators } from "@angular/forms";
import { MovieService } from "src/app/services/movie.service";
import { MovieModel } from "src/app/model/movie.model";
import { Router } from "@angular/router";
import { HttpErrorHandlerService } from "src/app/services/http-error-handler.service";
@Component({
  selector: "app-new-movie",
  templateUrl: "./new-movie.component.html",
  styleUrls: ["./new-movie.component.css"]
})
export class NewMovieComponent implements OnInit {
  movieForm: FormGroup;

  constructor(
    private http: MovieService,
    private httpErrorHandle: HttpErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  addMovie(form) {
    //if form is invalid, dont proceed with creating movie
    if (!form.valid) {
      return;
    }
    let movie = new MovieModel(
      form.value.title,
      form.value.year,
      form.value.imgUrl
    );
    this.insertMovie(movie);
  }

  insertMovie(movie) {
    this.http.insertMovie(movie).subscribe(
      data => {
        console.log(data, "data");
        alert("Uspesno ste dodali film!");
          this.router.navigate(["home"]);
      },
      error => {
        this.httpErrorHandle.handleError(error);
      },
      () => {}
    );
  }

  createForm() {
    this.movieForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      year: new FormControl("", [
        // sets password Validators according to the cognito defaults
        Validators.required
      ]),
      imgUrl: new FormControl("", [
        // sets password Validators according to the cognito defaults
        Validators.required
      ])
    });
  }
}
