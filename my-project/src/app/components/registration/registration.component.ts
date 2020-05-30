import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { passwordsMatch } from "../../validators/password-validator.directive";
import { User } from "src/app/model/user";
import { UserService } from "src/app/services/user.service";
import { sha256 } from "js-sha256";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  hidePassword = true;
  hideRepeatedPassword = true;
  samePassword = true;

  get email() {
    return this.registrationForm.get("email");
  }
  get username() {
    return this.registrationForm.get("username");
  }
  get password() {
    return this.registrationForm.get("password");
  }
  get repeatedPassword() {
    return this.registrationForm.get("repeatedPassword");
  }

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registrationForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      repeatedPassword: new FormControl("", [])
    });
    this.updateFormValidators();
  }

  updateFormValidators() {
    this.registrationForm.controls["repeatedPassword"].setValidators([
      Validators.required,
      passwordsMatch("password")
    ]);
  }

  submitForm() {
    if (
      this.email.invalid ||
      this.username.invalid ||
      this.password.invalid ||
      this.repeatedPassword.invalid
    ) {
      return;
    } else if (this.password.value !== this.repeatedPassword.value) {
      return (this.samePassword = false);
    }

    this.registerUser(
      new User(
        this.email.value,
        this.username.value,
        sha256(this.password.value)
      )
    );
  }

  registerUser(user: User) {
    console.log(JSON.stringify(user, null, 2));
    this.userService.registerUser(user).subscribe(
      data => {
        //ispisi korisniku da se uspesno registrovao i da se ce biti redirektovan na login
        alert(
          "ispisi korisniku da se uspesno registrovao i da se ce biti redirektovan na login, samo lepse"
        );
        this.router.navigate(["login"]);
      },
      error => {
        console.log("Register user error: ", error);
      }
    );
  }
}
