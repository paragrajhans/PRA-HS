import { Component, OnInit } from '@angular/core'
import { UserService } from "../user.service"
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public users;

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(result => {
      this.users = result;
      console.log("GET USERS", result)
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(result => {
      console.log(result);
      this.getUsers();
    })
  }

}
