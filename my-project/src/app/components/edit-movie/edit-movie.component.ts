import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MovieService } from "src/app/services/movie.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Movie } from "src/app/model/movie";
import { MovieModel } from "src/app/model/movie.model";
import { HttpErrorHandlerService } from "src/app/services/http-error-handler.service";

@Component({
  selector: "app-edit-movie",
  templateUrl: "./edit-movie.component.html",
  styleUrls: ["./edit-movie.component.css"]
})
export class EditMovieComponent implements OnInit {
  id: string;
  movie: Movie;
  editMovieForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: MovieService,
    private httpErrorHandle: HttpErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.getMovieById(this.id);
  }

  /**
   * Retrieve movie by ID from backend.
   * @param id - String
   */
  getMovieById(id) {
    this.http.getMovieById(id).subscribe(
      data => {
        this.movie = data.movies[0];
        this.fillFormWithMovieData();
      },
      error => {
        this.httpErrorHandle.handleError(error);
      }
    );
  }

  fillFormWithMovieData() {
    this.editMovieForm.get("title").setValue(this.movie.title);
    this.editMovieForm.get("year").setValue(this.movie.year);
    this.editMovieForm.get("imgUrl").setValue(this.movie.imgUrl);
  }

  createForm() {
    this.editMovieForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      year: new FormControl("", [Validators.required]),
      imgUrl: new FormControl("", [Validators.required])
    });
  }

  editMovie(form) {
    if (!form.valid) {
      return;
    }

    let movie = new MovieModel(
      form.value.title,
      form.value.year,
      form.value.imgUrl
    );
    this.updateMovie(this.id, movie);
  }

  updateMovie(id: string, movie: MovieModel) {
    this.http.updateMovie(id, movie).subscribe(
      data => {
        alert("Uspešno ste izmenili film!");
        this.router.navigate(["home"]);
      },
      error => {
        this.httpErrorHandle.handleError(error);
      }
    );
  }
}
