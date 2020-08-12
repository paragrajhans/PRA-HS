import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../user"
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user: User = new User();
  public users;
  public adduserform: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public backtoUsers() {
    this.router.navigateByUrl("/users");
  }

  public addUser() { }

}
