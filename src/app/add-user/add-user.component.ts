import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { User } from "../user"
import * as data from "../mock_data.json"
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user: User = new User();
  submitted = false;
  public users;
  public adduserform: FormGroup;

  constructor(private router: Router, private frmBld: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.adduserform = this.frmBld.group({
      id: ['', Validators.required],
      first: ['', Validators.required],
      last: ['', Validators.required],
      age: ['', Validators.required],
      title: ['', Validators.required],
      other: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    })
  }

  public backtoUsers() {
    this.router.navigateByUrl("/users");
  }

  public getId() {
    let a = (data as any).default;
    return Object.keys(a).length;
  }

  public addUser() {
    this.submitted = true;


    let tempuser = {
      id: this.getId(),
      name: {
        first: this.adduserform.get('first').value,
        last: this.adduserform.get('last').value,
      },
      age: this.adduserform.get('age').value,
      title: this.adduserform.get('title').value,
      other: this.adduserform.get('other').value,
      company: this.adduserform.get('company').value,
      email: this.adduserform.get('email').value,
      phone: [this.adduserform.get('phone').value],
      address: this.adduserform.get('address').value,
      address2: this.adduserform.get('address2').value,
      city: this.adduserform.get('city').value,
      state: this.adduserform.get('state').value,
      zipcode: this.adduserform.get('zipcode').value,
    }

    this.userService.saveUser(JSON.stringify(tempuser)).subscribe(result => {
      console.log("RESULT", result);
      this.router.navigateByUrl("/users");
    }, err => {
      console.log(err);
    })


  }

}
