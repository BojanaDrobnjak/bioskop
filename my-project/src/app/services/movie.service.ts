import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MovieModel } from "../model/movie.model";
import { MovieListDto } from "../model/movie-list-dto";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  constructor(private http: HttpClient) {}

  expressbaseUrl = "http://localhost:8080/movie/";

  getMovies() {
    return this.http.get<MovieListDto>(this.expressbaseUrl + "get");
  }

  getMovieById(id: string) {
    return this.http.get<MovieListDto>(this.expressbaseUrl + "get/" + id);
  }

  insertMovie(movie: MovieModel) {
    return this.http.post<MovieModel>(this.expressbaseUrl + "create", movie);
  }

  deleteMovie(id: String) {
    return this.http.delete(this.expressbaseUrl + "remove/" + id);
  }

  updateMovie(id: string, movie: MovieModel) {
    return this.http.put(this.expressbaseUrl + "update/" + id, movie);
  }
}
