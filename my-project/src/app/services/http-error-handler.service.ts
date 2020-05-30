import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class HttpErrorHandlerService {
  constructor(private router: Router) {}

  handleError(error: any) {
    if (error.status === 401) {
      localStorage.removeItem("access_token");
      this.router.navigate(["login"]);
    }
    console.log("Error: ", error);
  }
}
