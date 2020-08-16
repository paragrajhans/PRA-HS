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

  //Navigate to add user
  public gotoAddUser() {
    this.router.navigateByUrl("/add-user");
  }

  ngOnInit(): void {
    this.getUsers();
  }

  //Get users
  public getUsers() {
    this.btnClick = false;
    this.userService.getUsers().subscribe(result => {
      this.users = result;
    })
  }

  //Delete user
  deleteUser(id: number) {
    this.btnClick = true;
    this.userService.deleteUser(id).subscribe(_ => {
      setTimeout(() => {
        this.getUsers();
      }, 1000);
    })
  }

  //Updat user by storing the particular user's data in localstorage and navigating to update user
  updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigateByUrl(`/update-user/${user.id}`);
  }

}
