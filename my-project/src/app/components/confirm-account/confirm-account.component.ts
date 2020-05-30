import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { HttpErrorHandlerService } from "src/app/services/http-error-handler.service";

@Component({
  selector: "app-confirm-account",
  templateUrl: "./confirm-account.component.html",
  styleUrls: ["./confirm-account.component.css"]
})
export class ConfirmAccountComponent implements OnInit {
  public id: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private httpErrorHandle: HttpErrorHandlerService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.confirmAccount(this.id);
  }

  confirmAccount(code: string) {
    this.userService.verifyAccount(code).subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.httpErrorHandle.handleError(error);
      }
    );
  }
}
