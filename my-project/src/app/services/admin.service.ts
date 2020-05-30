import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";
import { UsersDTO } from "../model/users-dto";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  expressbaseUrl = "http://localhost:8080/user";
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<UsersDTO>(this.expressbaseUrl + "/get");
  }

  deleteUser(id: string) {
    return this.http.delete(this.expressbaseUrl + "/remove/" + id);
  }

  confirmUserAccount(verificationCode: string) {
    return this.http.patch(this.expressbaseUrl + "/confirm-account", {
      code: verificationCode
    });
  }
}
