import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() year: number;
  @Input() imgUrl: string;

  constructor(private route: Router) {}

  ngOnInit(): void {}

  redirectToMovie() {
    this.route.navigate(["movie-details/" + this.id]);
  }
}
