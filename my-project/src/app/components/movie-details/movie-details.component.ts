import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from "src/app/model/movie";
import { MovieService } from "src/app/services/movie.service";
import { HttpErrorHandlerService } from "src/app/services/http-error-handler.service";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent implements OnInit {
  id: string;
  movie: Movie;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: MovieService,
    private httpErrorHandle: HttpErrorHandlerService
  ) {}

  ngOnInit(): void {
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
      },
      error => {
        this.httpErrorHandle.handleError(error);
      }
    );
  }

  deleteMovieById() {
    this.http.deleteMovie(this.id).subscribe(
      data => {
        alert("you deleted movie!");
        this.router.navigate(["home"]);
      },
      error => {
        this.httpErrorHandle.handleError(error);
      }
    );
  }

  editMovie() {
    this.router.navigate(["edit-movie/" + this.id]);
  }
}
