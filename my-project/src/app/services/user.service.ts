import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  expressbaseUrl = "http://localhost:8080/user";

  registerUser(user: User) {
    return this.http.post(this.expressbaseUrl + "/create", user);
  }

  verifyAccount(confirmationCode: string) {
    return this.http.patch(this.expressbaseUrl + "/confirm-account", {
      code: confirmationCode
    });
  }

  login(username: string, password: string) {
    return this.http.post(this.expressbaseUrl + "/login", {
      uss: username,
      pass: password
    });
  }
}
