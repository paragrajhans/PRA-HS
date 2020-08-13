import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { UserService } from "../user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from '../user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public user;
  id: number;
  public updateuserform: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private frmBld: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);

    this.updateuserform = this.frmBld.group({
      id: ['', Validators.required],
      first: ['', Validators.required],
      last: ['', Validators.required],
      age: ['', Validators.required],
      title: ['', Validators.required],
      other: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    })
  }

  backtoUsers() {
    this.router.navigateByUrl("/users");
  }

  updateUser() {

    let tempuser = {
      id: Number(this.id),
      name: {
        first: this.updateuserform.get('first').value,
        last: this.updateuserform.get('last').value,
      },
      age: this.updateuserform.get('age').value,
      title: this.updateuserform.get('title').value,
      other: this.updateuserform.get('other').value,
      company: this.updateuserform.get('company').value,
      email: this.updateuserform.get('email').value,
      phone: [this.updateuserform.get('phone').value],
      address: this.updateuserform.get('address').value,
      address2: this.updateuserform.get('address2').value,
      city: this.updateuserform.get('city').value,
      state: this.updateuserform.get('state').value,
      zipcode: this.updateuserform.get('zipcode').value,
    }
    console.log("TEMPUSER", tempuser);

    this.userService.updateUser(JSON.stringify(tempuser)).subscribe(result => {
      console.log("RESULT", result);
      this.router.navigateByUrl("/users");
    }, err => {
      console.log(err);
    })
  }

}
