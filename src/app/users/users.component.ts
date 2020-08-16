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
  public btnClick: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  public gotoAddUser() {
    this.router.navigateByUrl("/add-user");
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.btnClick = false;
    this.userService.getUsers().subscribe(result => {
      this.users = result;
      console.log("GET USERS", result)
    })
  }

  deleteUser(id: number) {
    this.btnClick = true;
    console.log(this.btnClick);
    this.userService.deleteUser(id).subscribe(_ => {
      setTimeout(() => {
        this.getUsers();
      }, 1000);
    })
  }

  updateUser(user) {
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigateByUrl(`/update-user/${user.id}`);
  }

}
