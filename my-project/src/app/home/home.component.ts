import { Component, OnInit } from "@angular/core";
import { MovieService } from "../services/movie.service";
import { Todo } from "../model/todo";
import { Movie } from "../model/movie";
import { Router } from "@angular/router";
import { HttpErrorHandlerService } from "../services/http-error-handler.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  todoId: number;
  listOfMovies: Movie[] = [];
  todoObj = new Todo();

  constructor(
    private http: MovieService,
    private route: Router,
    private httpErrorHandle: HttpErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.http.getMovies().subscribe(
      data => {
        this.listOfMovies = data.movies;
      },
      error => {
        this.httpErrorHandle.handleError(error);
      },
      () => {}
    );
  }

  redirectToCreateMovie() {
    this.route.navigate(["new-movie"]);
  }
}
