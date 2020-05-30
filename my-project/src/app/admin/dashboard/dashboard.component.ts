import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { User } from "src/app/model/user";
import { AdminService } from "src/app/services/admin.service";
import { HttpErrorHandlerService } from "src/app/services/http-error-handler.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  usersData: User[];
  displayedColumns: string[] = [
    "id",
    "email",
    "username",
    "verified",
    "verify",
    "delete"
  ];
  dataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private adminService: AdminService,
    private httpErrorHandle: HttpErrorHandlerService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.adminService.getUsers().subscribe(
      data => {
        this.usersData = data.users;
        this.dataSource = new MatTableDataSource<User>(this.usersData);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.httpErrorHandle.handleError(error);
      }
    );
  }

  deleteUser(id: string) {
    this.adminService.deleteUser(id).subscribe(
      data => {
        alert("User deleted!");
        location.reload();
      },
      error => {
        this.httpErrorHandle.handleError(error);
      }
    );
  }

  verifyUser(verificationCode: string) {
    this.adminService.confirmUserAccount(verificationCode).subscribe(
      data => {
        alert("User verified!");
        location.reload();
      },
      error => {
        this.httpErrorHandle.handleError(error);
      }
    );
  }
}
